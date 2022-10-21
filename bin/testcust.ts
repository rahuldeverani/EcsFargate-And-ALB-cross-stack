#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestcustStack } from '../lib/testcust-stack';

const app = new cdk.App();
new TestcustStack(app, 'TestcustStack');
