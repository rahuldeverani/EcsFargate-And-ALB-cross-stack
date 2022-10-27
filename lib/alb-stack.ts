import { Duration, Stack, StackProps , CfnParameter ,CfnOutput } from 'aws-cdk-lib';
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

export class AlbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });


const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
    vpc,
    internetFacing: true
  })

  new ssm.StringParameter(this, 'VPCID', {
    parameterName: `/VpcProvider/VPCID`,
    stringValue: vpc.vpcId
})

new ssm.StringParameter(this, 'ALBARN', {
    parameterName: `/AlbProvider/ALBARN`,
    stringValue: lb.loadBalancerArn
})



}}