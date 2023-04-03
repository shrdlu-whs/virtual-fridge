$VPCStack=aws cloudformation describe-stacks --stack-name VPCStackTeam1 --region=eu-central-1 --query "Stacks[*].Outputs.{VpcId:[?OutputKey=='VpcId'],SubnetIds:[?OutputKey=='SubnetIds']}" | ConvertFrom-Json
$VPCId=$VPCStack.VpcId.OutputValue
$subnetIds=$VPCStack.SubnetIds.OutputValue.Split(',')

#Filter for private subnets
$privateSubnets = aws ec2 describe-subnets --subnet-ids $subnetIds --region eu-central-1 --filters Name="tag:aws:cloudformation:logical-id",Values="PrivateSubnet01","PrivateSubnet02" | ConvertFrom-Json
$privateSubnetId1=$privateSubnets.Subnets[0].SubnetId
$privateSubnetId2=$privateSubnets.Subnets[1].SubnetId
"Private Subnet 01:" + $privateSubnetId1
"Private Subnet 02:" +$privateSubnetId2
"VPC ID:" +$VPCId

#Production parameter
$dbInstanceIdentifier="virtual-fridge-db-team1-production"
$replicaInstanceIdentifier="virtual-fridge-db-team1-replica-production"

aws cloudformation create-stack --stack-name DBStackTeam1Develop --template-body file://../infrastructure/cf-templates/rds/postgresRDSInExistingVPC.template --parameters ParameterKey="VpcId",ParameterValue="$VPCId" ParameterKey="SubnetIdMaster",ParameterValue="$privateSubnetId1" ParameterKey="SubnetIdReplica",ParameterValue="$privateSubnetId2"
$environmentType="Production"
aws cloudformation create-stack --stack-name DBStackTeam1Production --template-body file://../infrastructure/cf-templates/rds/postgresRDSInExistingVPC.template --parameters ParameterKey="VpcId",ParameterValue="$VPCId" ParameterKey="SubnetIdMaster",ParameterValue="$privateSubnetId1" ParameterKey="SubnetIdReplica",ParameterValue="$privateSubnetId2" ParameterKey="DBInstanceIdentifier",ParameterValue="$dbInstanceIdentifier" ParameterKey="ReplicaInstanceIdentifier",ParameterValue="$replicaInstanceIdentifier" ParameterKey="EnvironmentType",ParameterValue="$environmentType"