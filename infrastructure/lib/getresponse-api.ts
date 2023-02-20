import axios from 'axios'
import { ebookBasename } from './ebook-basename'
import { SSM } from '@aws-sdk/client-ssm'
import { getresponseApiKeyParamName } from './getresponse-api-key-param-name'

const ssm = new SSM({})
const getresponseApiKey = (async () => {
  const parameter = await ssm.getParameter({
    Name: getresponseApiKeyParamName,
    WithDecryption: true,
  })
  return parameter.Parameter!.Value!
})()

const getresponseApiLoader = (async () =>
  axios.create({
    baseURL: 'https://api.getresponse.com/v3',
    headers: {
      'X-Auth-Token': `api-key ${await getresponseApiKey}`,
      // 'X-Domain': 'brightinventions.pl'
    },
  }))()

interface GetresponseCampaign {
  campaignId: string
  name: string
  description: string
}

const getresponseCampaignsLoader = (async function getresponseCampaigns() {
  const getresponseApi = await getresponseApiLoader
  const axiosResponse = await getresponseApi.get<GetresponseCampaign[]>('/campaigns', {
    params: {
      perPage: 1000,
    },
  })
  return axiosResponse.data
})()

interface GetresponseContact {
  name: string
  email: string
}

const ReferrerUrlCustomFieldId = 'pLN0Zx'

export async function registerUserInGetresponse({
  ebookName,
  name,
  email,
  referrerUrl,
}: {
  ebookName: string
  email: string
  name: string
  referrerUrl: string | undefined
}) {
  const getresponseApi = await getresponseApiLoader
  const campaigns = await getresponseCampaignsLoader
  const ebookShortName = ebookBasename(ebookName).substring(0, 64)
  let campaignForEbook = campaigns.find(c => c.name.includes(ebookShortName))
  console.log('Campaign for ebookName', { campaignForEbook, ebookName })
  if (!campaignForEbook) {
    const createdCampaign = await getresponseApi.post<GetresponseCampaign>('/campaigns', {
      name: ebookShortName,
      optinTypes: {
        email: 'single',
        api: 'single',
        import: 'single',
        webform: 'single',
      },
    })
    campaignForEbook = createdCampaign.data
    console.log('Created campaign', createdCampaign.data)
    campaigns.push(createdCampaign.data)
  }

  const contactCreatedResponse = await getresponseApi.post<GetresponseContact>(
    '/contacts',
    {
      name,
      email,
      dayOfCycle: '0',
      campaign: {
        campaignId: campaignForEbook.campaignId,
      },
      customFieldValues: [
        {
          customFieldId: ReferrerUrlCustomFieldId,
          value: [referrerUrl],
        },
      ].filter(customField => customField.value.some(value => isDefined(value))),
    },
    {
      validateStatus: (status: number) => status < 300 || status == 409,
    }
  )
  console.log({ contactCreatedResponse })
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
