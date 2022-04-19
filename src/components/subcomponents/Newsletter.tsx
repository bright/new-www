import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { CustomSectionTitle, CustomTextRegular } from '../shared'

const NewsletterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 ${variables.pxToRem(64)} 0;

  @media ${variables.device.tablet} {
    flex-direction: column;
    gap: 0;
  }
`
const FormWrapper = styled.div`
  max-width: ${variables.pxToRem(460)};
  padding: 0 ${variables.pxToRem(30)};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const WrapperAgreeNewslatter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${variables.pxToRem(10)};

  & input {
    margin-right: ${variables.pxToRem(10)};
    border: 2px solid ${variables.color.black};
  }
  & span {
    font-size: ${variables.pxToRem(11)};
  }
`
const SubscribeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${variables.pxToRem(20)} ${variables.pxToRem(10)};
  & input {
    margin-top: ${variables.pxToRem(10)};
    width: 100%;
    height: ${variables.pxToRem(50)};
    border: 2px solid ${variables.color.black};
    padding: ${variables.pxToRem(10)};
    & ::placeholder {
      font-weight: 600;
      color: ${variables.color.text};
    }
  }
`
const Button = styled.button`
  background-color: ${variables.color.primary};
  color: #ffff;
  height: ${variables.pxToRem(50)};
  width: 100%;
  max-width: ${variables.pxToRem(200)};
  border: none;
  font-size: ${variables.pxToRem(20)};
  font-weight: 700;
  margin: 0 auto;
  margin-top: ${variables.pxToRem(30)};
  cursor: pointer;
  & :hover {
    background-color: ${variables.color.black};
  }
`
export default function Newsletter() {
  return (
    <NewsletterWrapper>
      <StaticImage src='../../../static/images/newsletter.png' alt='Newsletter' className='newsimage' />
      {/* <script
        type='text/javascript'
        src='https://app.getresponse.com/view_webform_v2.js?u=QX16N&webforms_id=hiz1B'
        data-webform-id='hiz1B'
        defer={true}
      ></script>
      <div id='hiz1B'></div> */}
      <FormWrapper>
        <CustomSectionTitle
          margin='0 0 20px 0'
          laptopMargin='0 0 20px 0'
          tabletXLMargin='0 0 20px 0'
          tabletMargin='116px 0 20px 0'
          mobileMargin='82px 0 20px 0'
        >
          join our <span> bright</span> newsletter
        </CustomSectionTitle>
        <CustomTextRegular>
          Sing up to recive <b> once a month</b> new blog posts, info about free workshop and more. SPAM shall not pass!
        </CustomTextRegular>
        <Form action='https://app.getresponse.com/add_subscriber.html' accept-charset='utf-8' method='post'>
          <SubscribeWrapper>
            <input type='text' name='first_name' placeholder='Name' />
            <input type='text' name='email' placeholder='Email' />
          </SubscribeWrapper>

          <WrapperAgreeNewslatter>
            <input id='webform_consent#hbNh_0' type='checkbox' name='webform[consent#hbNh-ver#GLN5]' value='true' />{' '}
            <label htmlFor='webform_consent#hbNh_0'>
              {' '}
              <span>I agree to receive communication from Bright Inventions.</span>
            </label>
          </WrapperAgreeNewslatter>

          <input type='hidden' name='campaign_token' value='zjdq9' />
          <Button type='submit' value='Subscribe'>
            <CustomTextRegular>I wont to join</CustomTextRegular>
          </Button>
        </Form>
      </FormWrapper>
    </NewsletterWrapper>
  )
}
