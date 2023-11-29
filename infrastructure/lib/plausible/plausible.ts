import { CfnOutput, RemovalPolicy, Size, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  BastionHostLinux,
  BlockDeviceVolume,
  CloudFormationInit,
  InitCommand,
  InitFile,
  InstanceClass,
  InstanceSize,
  InstanceType,
  IVpc,
  Peer,
  Port,
  SubnetType,
  Volume
} from 'aws-cdk-lib/aws-ec2'
import path from 'path'
import { deployEnv } from '../deploy-env'
import { PolicyStatement, User } from 'aws-cdk-lib/aws-iam'
import { SesSmtpCredentials } from '@pepperize/cdk-ses-smtp-credentials'
import { BackupPlan, BackupResource } from 'aws-cdk-lib/aws-backup'

interface PlausibleProps {
  vpc: IVpc
}

export class Plausible extends Stack {
  constructor(scope: Construct, id: string, props: PlausibleProps) {
    super(scope, id)

    const plausibleBaseUrl =
      deployEnv() == 'production'
        ? 'https://plausible.brightinventions.pl'
        : `https://plausible-${deployEnv()}.brightinventions.pl`

    const blogSesSmtp = new User(this, 'ses-smtp')

    const availabilityZone = props.vpc.availabilityZones[0]

    const dataVolume = new Volume(this, 'data', {
      availabilityZone: availabilityZone,
      encrypted: true,
      size: Size.gibibytes(50),
      removalPolicy: RemovalPolicy.SNAPSHOT
    })

    const allowSendingEmail = new PolicyStatement({
      actions: ['ses:SendRawEmail'],
      resources: ['*'],
    })

    blogSesSmtp.addToPolicy(allowSendingEmail)

    const smtpCredentials = new SesSmtpCredentials(this, 'ses-smtp-credentials', {
      user: blogSesSmtp,
    })

    new CfnOutput(this, 'smtp credentials secret', {
      description: 'Will be removed manually after first read',
      value: smtpCredentials.secret.secretName,
    })

    const dataDevice = '/dev/xvdz'

    const bastionHostLinux = new BastionHostLinux(this, 'plausible-v5', {
      vpc: props.vpc,
      availabilityZone: availabilityZone,
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MEDIUM),
      subnetSelection: {
        subnetType: SubnetType.PUBLIC,
      },
      blockDevices: [
        {
          deviceName: '/dev/xvda',
          volume: BlockDeviceVolume.ebs(50),
        },
      ],
      init: CloudFormationInit.fromElements(
        InitFile.fromString('/home/ec-user/prepare-data-volume.sh', `#!/bin/bash
TOKEN=$(curl -SsfX PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
INSTANCE_ID=$(curl -SsfH "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
aws --region ${Stack.of(this).region} ec2 attach-volume --volume-id ${dataVolume.volumeId} --instance-id $INSTANCE_ID --device ${dataDevice}
while ! test -e ${dataDevice}; do sleep 1; done

EBS_DEVICE="${dataDevice}"
MOUNT_POINT="/mnt/docker-data"

echo "Checking if the EBS volume has a file system..."
if ! blkid $EBS_DEVICE; then
    echo "Creating file system on $EBS_DEVICE..."
    mkfs -t ext4 $EBS_DEVICE
fi

# Create a mount point and mount the EBS volume
echo "Mounting the EBS volume..."
mkdir -p $MOUNT_POINT
mount $EBS_DEVICE $MOUNT_POINT

# Add the mount to /etc/fstab for automatic remount after reboot
UUID=$(blkid -s UUID -o value $EBS_DEVICE)
echo "UUID=$UUID $MOUNT_POINT ext4 defaults,nofail 0 2" >> /etc/fstab

# Move Docker data to the EBS volume and create a symbolic link
echo "Moving Docker data to the EBS volume..."
mv /var/lib/docker $MOUNT_POINT/
ln -s $MOUNT_POINT/docker /var/lib/docker


        `, {
          owner: 'ec2-user',
          mode: '000744',
        }),
        InitFile.fromFileInline('/home/ec2-user/install-dependencies.sh', path.join(__dirname, 'install-dependencies.sh'), {
          owner: 'ec2-user',
          mode: '000744',
        }),
        InitFile.fromFileInline('/home/ec2-user/docker-compose.yml', path.join(__dirname, 'docker-compose.yml'), {
          owner: 'ec2-user',
          mode: '000400',
        }),
        InitFile.fromString(
          '/home/ec2-user/common.env',
          `
BASE_URL=${plausibleBaseUrl}
`,
          {
            owner: 'ec2-user',
            mode: '000400',
          }
        ),
        InitFile.fromString(
          '/home/ec2-user/plausible-conf.env',
          `
DISABLE_REGISTRATION=invite_only          
MAILER_EMAIL=plausible@brightinventions.pl
MAILER_NAME=Plausible
SMTP_HOST_ADDR=email-smtp.eu-central-1.amazonaws.com
SMTP_HOST_PORT=587
SMTP_HOST_SSL_ENABLED=1
# this doesn't work, but we will resolve secrets manually 
SMTP_USER_NAME=${smtpCredentials.secret.secretValueFromJson('username')}
SMTP_USER_PWD=${smtpCredentials.secret.secretValueFromJson('password')}
SECRET_KEY_BASE=7La7E4MKXkw8MZJIVsMCCAJ5OCiKlsoNLkXZhYrxoLBNwX9KUA7Uf0AHkXtgPVQLahoY02p5KRlxA7+rY92Sxg==
# please see https://console.cloud.google.com/apis/credentials?highlightClient=36785321099-i4h0qtbl6lc4kmqncu13rn4c12s6rvlo.apps.googleusercontent.com&project=plausible-brightinventions-pl
GOOGLE_CLIENT_ID=36785321099-i4h0qtbl6lc4kmqncu13rn4c12s6rvlo.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=
`,
          {
            owner: 'ec2-user',
            mode: '000400',
          }
        ),
        InitFile.fromString(
          '/home/ec2-user/plausible_db.env',
          `
POSTGRES_PASSWORD=fea20aad4b255a2e815b06d147ed61bc
`,
          {
            owner: 'ec2-user',
            mode: '000400',
          }
        ),

        InitCommand.shellCommand('sudo /home/ec2-user/install-dependencies.sh'),
        InitCommand.shellCommand('sudo /home/ec-user/prepare-data-volume.sh'),
        InitCommand.shellCommand(`sudo systemctl enable docker.service`),
        InitCommand.shellCommand(`sudo systemctl start docker.service`),
        InitCommand.shellCommand(`sudo docker compose up -d`, {
          cwd: '/home/ec-user/',
          ignoreErrors: true
        }),
      ),
    })

    dataVolume.grantAttachVolume(bastionHostLinux)
    dataVolume.grantDetachVolume(bastionHostLinux)

    bastionHostLinux.connections.allowFrom(Peer.anyIpv4(), Port.tcp(80))
    bastionHostLinux.connections.allowFrom(Peer.anyIpv4(), Port.tcp(443))

    smtpCredentials.secret.grantRead(bastionHostLinux)

    BackupPlan.dailyMonthly1YearRetention(this, 'backup')
      .addSelection('plausible', {
        resources: [
          BackupResource.fromConstruct(this)
        ]
      })
  }
}
