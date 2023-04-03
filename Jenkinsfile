pipeline {
    agent {
        kubernetes {
            yamlFile './infrastructure/k8s/jenkins/agent-pod-template.yaml'
        }
    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        AWS_DEFAULT_REGION = 'eu-central-1'
        APP_CLIENT_NAME = "fridge-app-client"
        APP_API_NAME = "fridge-app-api"
        BUILD_NUMBER = "$env.BUILD_NUMBER"
        SCANNER_HOME = tool 'sonar-scanner'
        BRANCH = detectBranch()
        REPO_NAME_API = "${env.APP_API_NAME}"
        REPO_NAME_CLIENT = "${env.APP_CLIENT_NAME}"
        DOCKER_TAG= "${env.BRANCH}_${GIT_COMMIT[0..7]}"
        RELEASE_NAME = "fridge"
    }
    stages {
        stage('Detect Branch') {
            when {
                branch pattern: "^(?!(master)|(develop)).*\$", comparator: "REGEXP"
            }
            steps {
                echo "Feature branch found. Renamed to feature"
                echo "${env.BRANCH}"
                echo "${env.REPO_NAME_API}"
                echo "${env.REPO_NAME_CLIENT}"
            }
        }
        stage('Build Backend') {
            steps {
                container('maven') {
                    sh '''
                        mvn -version
                        mvn package -DskipTests
                    '''
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir("webApp") {
                    container('yarn') {
                        sh '''
                            # install yarn paket manager globally
                            #npm install -g yarn

                            # run yarn install
                            yarn

                            # run build for dependencies
                            yarn build
                        '''
                    }
                }
            }
        }
        stage('Test') {
            steps {
                container('maven') {
                    sh '''
                        echo "Run Maven Test"
                        mvn test
                    '''
                }
            }
        }
        stage('SonarQube analysis') {
            steps {
                container('jnlp') {
                    withSonarQubeEnv('sonarqube') {

                        sh '''
                            echo "Sonarqube scan"
                            ${SCANNER_HOME}/bin/sonar-scanner -Dsonar.login=$SONAR_AUTH_TOKEN
                            '''
                    }
                }
                dir("webApp") {
                    container('sonarjs') {
                        withSonarQubeEnv('sonarqube') {
                            sh '''
                                    npm install -g yarn
                                    yarn
                                    yarn test
                                    yarn sonar
                                '''
                        }
                    }
                }
            }
        }

        stage("Quality gate") {
            steps {
                echo "TODO: Wait for quality gate"
                //waitForQualityGate abortPipeline: true
            }
        }

        stage('Configure ECR') {
            steps {
                container('aws') {
                    sh '''
                        echo $BRANCH_NAME
                        echo $REPO_NAME_API
                        # Get Docker login command with AWS token and write it to shared volume
                        aws ecr get-login-password --region eu-central-1 > /home/jenkins/agent/docker-login
                        # Create repository if not there
                        aws ecr describe-repositories --repository-names ${REPO_NAME_API} || aws ecr create-repository --repository-name ${REPO_NAME_API}
                        aws ecr describe-repositories --repository-names ${REPO_NAME_CLIENT} || aws ecr create-repository --repository-name ${REPO_NAME_CLIENT}
                    '''
                }
            }
        }
        stage('Docker build & push') {
            steps {
                withCredentials([
                        string(credentialsId: 'aws-id', variable: 'AWS_ID')
                ]) {
                    //Get Docker login token from Secrets Manager
                    container('docker') {
                        sh '''
                        # Login to AWS ECR Repo

                        read DOCKER_LOGIN_TOKEN < /home/jenkins/agent/docker-login
                        docker login -u AWS -p $DOCKER_LOGIN_TOKEN https://$AWS_ID.dkr.ecr.eu-central-1.amazonaws.com 2>/dev/null

                        # delete Docker login secret
                        #rm /home/jenkins/agent/docker-login

                        # Build & push backend
                        docker build -t $REPO_NAME_API:$DOCKER_TAG .
                        docker tag $REPO_NAME_API:$DOCKER_TAG $AWS_ID.dkr.ecr.eu-central-1.amazonaws.com/$REPO_NAME_API:$DOCKER_TAG
                        docker push ${AWS_ID}.dkr.ecr.eu-central-1.amazonaws.com/$REPO_NAME_API:$DOCKER_TAG
                    '''

                        // Build & push frontend
                        dir("webApp") {
                            sh '''
                            docker build -t $REPO_NAME_CLIENT:$DOCKER_TAG .
                            docker tag $REPO_NAME_CLIENT:$DOCKER_TAG $AWS_ID.dkr.ecr.eu-central-1.amazonaws.com/$REPO_NAME_CLIENT:$DOCKER_TAG
                            docker push $AWS_ID.dkr.ecr.eu-central-1.amazonaws.com/$REPO_NAME_CLIENT:$DOCKER_TAG
                        '''
                        }
                    }
                }
            }
        }
        stage('Push & Install Helm Chart') {
            steps {
                withCredentials([
                        usernamePassword(credentialsId: 'db-login-develop', usernameVariable: 'DB_USERNAME', passwordVariable: 'DB_PASSWORD'),
                        string(credentialsId: 'db-url-develop', variable: 'DB_URL'),
                        string(credentialsId: 'aws-id', variable: 'AWS_ID'),
                        string(credentialsId: 'kubernetes-url', variable: 'KUBERNETES_URL'),
                        string(credentialsId: 'kubernetes-cluster-name', variable: 'KUBERNETES_CLUSTER_NAME'),
                        string(credentialsId: 'kubernetes-ca', variable: 'KUBERNETES_CA'),
                        string(credentialsId: 'kubernetes-service-token', variable: 'JENKINS_TOKEN')

                ]) {
                    container('helm') {
                        script {
                            namespace = "${BRANCH}"
                            release = "${RELEASE_NAME}"
                            configureKubectl()
                            createNamespace(namespace)
                            // Push Helm Chart
                            sh '''
                            export HELM_EXPERIMENTAL_OCI=1
                            read DOCKER_LOGIN_TOKEN < /home/jenkins/agent/docker-login
                            helm registry login -u AWS -p $DOCKER_LOGIN_TOKEN https://$AWS_ID.dkr.ecr.eu-central-1.amazonaws.com 2>/dev/null
                            helm chart save ./infrastructure/k8s/fridge-helm-chart $AWS_ID.dkr.ecr.eu-central-1.amazonaws.com/fridge-helm-chart:fridge
                            helm chart push $AWS_ID.dkr.ecr.eu-central-1.amazonaws.com/fridge-helm-chart:fridge
                            '''
                            helmDelete(namespace, release)
                            echo "Installing new release ${release}"
                            helmInstall(namespace, release)
                        }
                    }
                }
            }
        }
        stage("Deploy to Production") {
            when {
                anyOf {
                    branch 'master'; branch 'develop'
                }
            }
            input {
                message "Should we deploy from develop to Production?"
            }
            steps {
                withCredentials([
                        usernamePassword(credentialsId: 'db-login-production', usernameVariable: 'DB_USERNAME', passwordVariable: 'DB_PASSWORD'),
                        string(credentialsId: 'db-url-production', variable: 'DB_URL'),
                        string(credentialsId: 'aws-id', variable: 'AWS_ID'),
                        string(credentialsId: 'kubernetes-url', variable: 'KUBERNETES_URL'),
                        string(credentialsId: 'kubernetes-cluster-name', variable: 'KUBERNETES_CLUSTER_NAME'),
                        string(credentialsId: 'kubernetes-ca', variable: 'KUBERNETES_CA'),
                        string(credentialsId: 'kubernetes-service-token', variable: 'JENKINS_TOKEN')
                ]) {
                    container('helm') {
                        script {
                            echo "Manual approval granted. Deploying to production"
                            namespace = "production"
                            release = "${RELEASE_NAME}"
                            configureKubectl()
                            createNamespace(namespace)
                            helmInstall(namespace, release)
                        }
                    }
                }
            }
        }
    }
}

def detectBranch() {
    def branchName = "${env.BRANCH_NAME}"
    if (branchName == "master") {
        return 'production'
    } else if (branchName == "develop") {
        return 'develop'
    } else {
        return 'feature'
    }
}

/*
    Configure kubectl
 */
def configureKubectl () {
    echo "Configuring kubectl"

    script {
        sh '''
        kubectl config set-cluster $KUBERNETES_CLUSTER_NAME --server=$KUBERNETES_URL
        kubectl config set-credentials jenkins --token=$JENKINS_TOKEN
        kubectl config set-context default-context --cluster=$KUBERNETES_CLUSTER_NAME --user=jenkins
        kubectl config use-context default-context
        kubectl config set clusters.${KUBERNETES_CLUSTER_NAME}.certificate-authority-data $KUBERNETES_CA
        kubectl get pods -n jenkins
    '''
    }
}

/*
    Create the kubernetes namespace
 */
def createNamespace (namespace) {

    echo "Create namespace ${namespace} if needed and enable Istio sidecar injection"

    script {
    sh """
        [ -z \"\$(kubectl get ns ${namespace} -o name 2>/dev/null)\" ] && kubectl create ns ${namespace}
        kubectl label namespace ${namespace} istio-injection=enabled --overwrite
    """
    }
}

/*
    Helm install
 */
def helmInstall (namespace, release) {

    echo "Installing ${release} in ${namespace}"

    script {
        release = "${release}-${namespace}"
        sh """
        helm upgrade --install -n ${namespace} ${release}  --debug \\
            --set awsAccountId=\$AWS_ID \\
            --set image.tag=\$DOCKER_TAG \\
            --set env.database.url=\$DB_URL \\
            --set env.database.username=\$DB_USERNAME \\
            --set env.database.password=\$DB_PASSWORD \\
            --set env.database.jdbc_conn=jdbc:postgresql://db-service:5432/fridgeDb${namespace} \\
            --set app_client_name=\$APP_CLIENT_NAME \\
            --set app_api_name=\$APP_API_NAME \\
            ./infrastructure/k8s/fridge-helm-chart
        """
        sh "sleep 5"
    }
}

/*
    Helm delete (if exists)
 */
def helmDelete (namespace, release) {
    echo "Deleting ${release} in ${namespace} if deployed"

    script {
        release = "${release}-${namespace}"
        sh "[ -z \"\$(helm ls --short ${release} 2>/dev/null)\" ] || helm delete --purge ${release} -n ${namespace}"
    }
}