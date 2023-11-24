#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { Website } from '../lib/website'
import { CloudFrontCertificates } from '../lib/cloud-front-certificates'
import { Tag, Tags } from 'aws-cdk-lib'
import { Visitors } from '../lib/visitors'
import { deployEnvStackNameOf } from '../lib/stack-name'
import { Api } from '../lib/api'
import { Plausible } from '../lib/plausible/plausible'
import { Network } from '../lib/network'

const app = new cdk.App()

new CloudFrontCertificates(app)

// please see
// for details
// https://miensol.pl/cloudfront-custom-domain-https/

const network = new Network(app, deployEnvStackNameOf(Network))

const visitors = new Visitors(app, deployEnvStackNameOf(Visitors))

const plausible = new Plausible(app, deployEnvStackNameOf(Plausible), {
  vpc: network.vpc
})

const api = new Api(app, deployEnvStackNameOf(Api), {
  visitorsTable: visitors.visitorsTable,
})

// this stack is shared between prod & staging
// perhaps we should split it after some time
new Website(app, {
  apiUrl: api.apiUrl,
  certificateArn: 'arn:aws:acm:us-east-1:339594496974:certificate/22e6ab03-13e4-4541-9094-128a8024c5f8',
  ebooksBucket: api.ebooks,
  ebooksOriginAccessIdentity: api.ebooksOriginAccessIdentity
})

const tags = Tags.of(app)
tags.add('project', 'brightinventions.pl')
tags.add('source', 'https://github.com/bright/new-www/blob/gatsby/infrastructure')
