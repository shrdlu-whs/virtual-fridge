#Assumes execution folder /scripts

#Create cluster
eksctl create cluster -f ../infrastructure/k8s/eks-cluster.yaml
#Create service role for jenkins
kubectl apply -f ../infrastructure/k8s/jenkins/jenkins-role.yaml
#Add rolebinding to existing jenkins service account
kubectl apply -f ../infrastructure/k8s/jenkins/jenkins-rolebinding.yaml
#Install istio with custom load balancer config
istioctl install -f ../infrastructure/k8s/istio-config.yaml
#Install jenkins in existing jenkins namespace
#Disable istio sidecar in namespace jenkins - jenkins build server can not handle sidecars
kubectl label namespace jenkins istio-injection=disabled
#Install Jenkins Helm chart
helm repo add jenkins https://charts.jenkins.io
helm repo update
helm install jenkins jenkins/jenkins -f ../infrastructure/k8s/jenkins/jenkins-config.yaml -n jenkins
#Add jenkins authorization policies for ingress control
kubectl apply -f ../infrastructure/k8s/jenkins/jenkins-authpolicies.yaml
#Add jenkins gateway to access jenkins service from outside
kubectl apply -f ../infrastructure/k8s/jenkins/jenkins-gateway.yaml

#Add persistent volume claim for Maven agent pod
kubectl apply -f ../infrastructure/k8s/jenkins/maven-pvc.yaml