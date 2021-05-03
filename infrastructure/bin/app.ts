#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { Website } from '../lib/website'
import { CloudFrontCertificates } from '../lib/cloud-front-certificates'
import { Tag, Tags } from '@aws-cdk/core'

const app = new cdk.App()

new CloudFrontCertificates(app)

// please see
// for details
// https://miensol.pl/cloudfront-custom-domain-https/

new Website(app, {
  certificateArn: 'arn:aws:acm:us-east-1:339594496974:certificate/25970e69-39e2-4e6d-9c83-7081e40c40a0'
})

const tags = Tags.of(app)
tags.add('project', 'brightinventions.pl')
tags.add('source', 'https://github.com/bright/new-www/blob/gatsby/infrastructure')
