import { RefObject } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { VerifyRecaptchaOperationRequest, VerifyRecaptchaRequest } from '../../../api-client'
import { apiClient } from '../../../api-client/client'

const HUMAN_LIKELIHOOD_THRESHOLD = 0.5; // 0.0 - bot, 1.0 - human

export const isReCaptchaValid = async (recaptchaRef: RefObject<ReCAPTCHA>): Promise<boolean> => {
  const token = await recaptchaRef!.current!.executeAsync();
  const verifyRecaptchaRequest: VerifyRecaptchaRequest = {
    token: token!
  }
  const verifyRecaptchaOperationRequest: VerifyRecaptchaOperationRequest = {
    verifyRecaptchaRequest: verifyRecaptchaRequest
  }
  const response = await apiClient.verifyRecaptcha(verifyRecaptchaOperationRequest)
  const score: number = Number(response.score)
  return score >= HUMAN_LIKELIHOOD_THRESHOLD;
}