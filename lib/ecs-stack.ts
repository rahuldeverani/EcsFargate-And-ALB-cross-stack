import { Duration, Stack, StackProps , CfnParameter ,CfnOutput, RemovalPolicy , Fn} from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import * as apprunner1 from 'aws-cdk-lib/aws-apprunner'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as ssm from 'aws-cdk-lib/aws-ssm'

export class ecsServicestack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/VpcProvider/VPCID');
    const albARN = ssm.StringParameter.valueFromLookup(this, '/AlbProvider/ALBARN');
     const vpc = ec2.Vpc.fromLookup(this , 'myvpc' ,{vpcId: vpcId})
    
     const cluster = new ecs.Cluster(
      this, 'Ec2Cluster',
     { vpc: vpc}
  )


const taskDef = new ecs.FargateTaskDefinition(this, "MyTaskDefinition", {
  memoryLimitMiB: 512,
  cpu: 256,
});

const containerDef = new ecs.ContainerDefinition(this, "MyContainerDefinition", {
  image: ecs.ContainerImage.fromRegistry("coderaiser/cloudcmd"),
  taskDefinition: taskDef
});

containerDef.addPortMappings({
  containerPort: 8000
});




const service = new ecs.FargateService(this, 'Service', { cluster, taskDefinition: taskDef });

const cfnservice= service.node.defaultChild as ecs.CfnService

cfnservice.healthCheckGracePeriodSeconds = undefined;


const importedAlb= elbv2.ApplicationLoadBalancer.fromLookup(this , 'alb', {
  loadBalancerArn: albARN
})


const listener = importedAlb.addListener('Listener', {
  port: 80,
  open: true,
});

listener.addTargets('test1',{
  targets: [service],
  port: 80
})







}}