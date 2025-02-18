import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import axios from 'axios'
import { SSM } from '@aws-sdk/client-ssm'
import { recaptchaApiKeyParamName } from './recaptcha-api-key-param-name'

const SITE_KEY = '6Lf80doqAAAAAJa2ReybrabGvMunSubWjVLE3vIg'
const PROJECT_NAME = 'prod-brightinventions-pl'

const ssm = new SSM({})
const getRecaptchaApiKey = (async () => {
  const parameter = await ssm.getParameter({
    Name: recaptchaApiKeyParamName,
    WithDecryption: true
  })
  return parameter.Parameter!.Value!
})()

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const body = JSON.parse(event.body || '{}')
    const token = body.token

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing token' })
      }
    }
    const apiKey = await getRecaptchaApiKey
    const response = await axios.post(`https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_NAME}/assessments?key=${apiKey}`, {
      event: {
        token,
        expectedAction: 'USER_ACTION',
        siteKey: SITE_KEY
      }
    })

    const score = await response.data.riskAnalysis.score
    return {
      statusCode: 200,
      body: JSON.stringify({ score: score })
    }
  } catch (error) {
    // TODO Add log with information why verification failed
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to verify reCAPTCHA' })
    }
  }
}
