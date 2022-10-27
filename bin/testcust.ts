#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ecsServicestack } from '../lib/ecs-stack';
import { AlbStack } from '../lib/alb-stack';

const app = new cdk.App();
 const env= {region:"eu-west-3",account:"xxxxxxxxx"}
const ecsservicestack = new ecsServicestack(app, 'Ecsstack' , {env:env});
const albStack= new AlbStack(app, 'AlbStack', {env:env})

