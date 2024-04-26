import React from 'react'
import { Page } from '../layout/Page'
import styled from 'styled-components'
import variables from '../styles/variables'
import { SEO } from '../meta/SEO'

const Container = styled.div`
  && .container {
    color: ${variables.color.text};
    & strong {
      color: ${variables.color.text};
    }
    & a {
      &:hover {
        color: ${variables.color.text};
      }
    }
    & .title {
      color: ${variables.color.text};
    }
    h1 {
      font-size: ${variables.pxToRem(54)};
      font-weight: 900;
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(44)};
      }
      @media ${variables.device.tabletXL} {
        font-size: ${variables.pxToRem(38)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(32)};
        font-weight: 700;
      }
    }
    h2 {
      font-size: ${variables.pxToRem(54)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(34)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(22)};
      }
    }
    h3 {
      font-size: ${variables.pxToRem(28)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(25)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(18)};
      }
    }
    p,
    li {
      font-size: ${variables.pxToRem(20)};
      font-weight: 400;

      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(16)};
      }
    }
  }
`

export const Head = () => <SEO
  title='Privacy policy'
  description='All the necessary information about the data we collect and process when you use our website.'
/>

const PrivacyPolicy = () => {
  return (
    <Page>
      <Container>
        <div className='container'>
          <article className='section'>
            <h1 className='title '>Privacy Policy</h1>
            <div className='content'>
              <p>
                We value your trust in providing us with your data, thus we are striving to use commercially acceptable
                means of protecting it. Below you will find the necessary information about the data we collect and
                process when you use our website (
                <a href='/' target='_blank'>
                  https://brightinventions.pl
                </a>
                - &#xA0;hereinafter as &#x201C;Website&#x201D;).
              </p>
              <p>&#x200D;</p>
              <p>
                &#x200D;
                <strong>HOW WE USE AND HOW WE TAKE CARE OF YOUR DATA</strong> <br />
                <br />
              </p>
              <p>1. Controller of your personal data</p>
              <p>
                The controller of your personal data collected by the Website is Bright Inventions Sp. z o.o. <br />z
                siedzib&#x105; w Gda&#x144;sku, ul. Jana Matejki 12, 80 &#x2013;232 Gda&#x144;sk, KRS: 0000687244, NIP:
                5842761920, Poland (&#x201C;Bright Inventions&#x201D;, &#x201C;We&#x201D;, &#x201C;Our&#x201D; or
                &#x201C;Us&#x201D;).
                <br />
              </p>
              <p>
                In all cases regarding your personal data you can contact Us:
                <br />
              </p>
              <p>by mail - ul. Jana Matejki 12, 80-232 Gda&#x144;sk, Poland;</p>
              <p>by phone - +48 695 934 555; </p>
              <p>by e-mail - info@brightinventions.pl </p>
              <p>&#x200D;</p>
              <p>2. The purposes of the date processing</p>
              <p>
                Personal data is processed by the Controller in accordance with the law, in particular in accordance
                with the provisions of the Regulation of the European Parliament and of the Council (EU) 2016/679 of 27
                April 2016 on the protection of individuals with regard to the processing of personal data and on the
                free movement of such data and the repeal of Directive 95/46/EC (hereinafter referred to as
                &quot;GDPR&quot;) in order to:
              </p>
              <ul>
                <li>
                  answer to your contact requests when you use the contact forms on the Website &#x2013; on the grounds
                  of Our legitimate interests as a data controller;
                </li>
                <li>
                  analyze the way our Website is used and improve its functioning via Google Analytics Universal and
                  Google Analytics 4;
                </li>
                <li>
                  run marketing and business communication: distribute marketing content e.g. newsletters, ebooks, conduct offline and online events, and distribute recordings from these events on Bright Inventions' social media channels &#x2013; based on contact data provided to Us, on the
                  grounds of Our legitimate interests;
                </li>
                <li>
                  conduct and settle the outcome of a recruitment process if the user has applied to take part in the
                  recruitment process, on the basis of a legal obligation of the Controller and consent granted.
                </li>
              </ul>
              <p>&#x200D;</p>
              <p>Providing your personal information is voluntary.</p>
              <p>&#x200D;</p>
              <p>3. The scope of personal data being processed</p>
              <p>
                Your following personal data will be processed for the purposes indicated below:
                <br />
              </p>
              <ul>
                <li>
                  when you use a contact form: name, e-mail address, information on how you found Us, date and time of
                  sending Us your request and all information that you decide to provide us with by sending your
                  request;
                </li>
                <li>
                  when you submit &#xA0;comments; each time you use Our Website: the IP address of the device you are
                  using, information on how you use Our Website.
                </li>
              </ul>
              <p>
                &#x200D;
                <br />
              </p>
              <p>4. &#xA0;Recruitment processes</p>
              <p>
                The Controller of your personal data collected by the Website is Bright Inventions Sp. z o.o. With its
                registered office in Gdańsku, Jana Matejki Street 12, 80 –232 Gdańsk, KRS: 0000687244, NIP: 5842761920,
                Poland (“Bright Inventions”, “We”, “Our” or “Us”) and authorized employees of the Company who are
                responsible for recruitment processes as well as any legal entities chosen by the Company to process the
                data for hiring purposes.
              </p>
              <p>
                The purposes of processing personal data are:
                <br />
              </p>
              <p>
                <ul>
                  <li>
                    to conduct a recruitment process based on Article 6 (1)(a)(c) of the GDPR indicated in Article 22(1)
                    §1 of the Labor Code,
                  </li>
                  <li>
                    to establish and maintain contact with the Candidate in relation to the application documents they
                    submitted,
                  </li>
                  <li>
                    to manage and resolve the recruitment process including all the necessary actions at the request of
                    the data subject before concluding the contract - in the scope of data indicated in Article 22(1) §1
                    of the Labor Code and on the basis of the Candidate's consent, i.e. Article 6(1)(a) of the GDPR and
                    in the scope of data beyond the catalog indicated in Article 22(1) §1 of the Labor Code,
                  </li>
                  <li>
                    to take account of the Candidate's application documents in future recruitment processes on the
                    basis of their voluntary agreement (Article 6 (1)(a) of the GDPR).
                  </li>
                </ul>
              </p>
              <p>
                The scope of the processing of personal data for recruitment:
                <br />
              </p>
              <p>
                <ul>
                  <li>
                    an email address from which the message was sent and the information contained in the application
                    form;
                  </li>
                  <li>
                    data provided by the Candidate falls under a statutory obligation to provide names and last names,
                    parents' names, date of birth, contact details, information about education and employment history
                    according to Article 22(1) §1 of the Labor Code. Providing other personal data is voluntary.
                  </li>
                </ul>
              </p>
              <p>
                Data retention period
                <br />
              </p>
              <p>
                Personal data collected for the purposes of recruitment will be processed for the duration of the
                recruitment process unless the Candidate agrees to leave the data in order to be considered during
                future recruitments. Data will be stored until the withdrawal of the consent
              </p>
              <p>
                Your rights concerning our recruitment data processing process:
                <br />
              </p>
              <p>
                <ul>
                  <li>
                    You have the right to access your personal data and to change it. You have the right to request its
                    removal, as well as to request the Administrator to limit data processing, as well as to transfer
                    it. In addition, you have the right to object to the processing of personal data of which processing
                    is based on Article 6 (1) (f) of the GDPR i.e. the Company's legitimate interest.
                  </li>
                  <li>
                    You have the right to lodge a complaint with the Chairman of Poland's Personal Data Protection
                    Office if you believe that your data processing violates the provisions of the General Data
                    Protection Regulation.
                  </li>
                </ul>
              </p>
              <p>
                Your data will not be transferred to a third country or international organization and will not be used
                for profiling.
              </p>
              <p>5. &#xA0;Businesses communications processes</p>
              <p>
                The Controller of your personal data collected by the Website is Bright Inventions Sp. z o.o. With its
                registered office in Gdańsku, Jana Matejki Street 12, 80 –232 Gdańsk, KRS: 0000687244, NIP: 5842761920,
                Poland (“Bright Inventions”, “We”, “Our” or “Us”) and authorized employees of the Company who are
                responsible for recruitment processes as well as any legal entities chosen by the Company to process the
                data for hiring purposes.
              </p>
              <p>
                The purposes of processing personal data are:
                <br />
              </p>
              <p>
                <ul>
                  <li>
                    to establish and maintain contact with a business representative using a contact form on Bright Inventions’ website,
                  </li>
                  <li>
                    to provide a business representative with marketing information about Bright Inventions via email marketing.                  
                  </li>
                </ul>
              </p>
              <p>
                The scope of the processing of personal data for recruitment:
                <br />
              </p>
              <p>
                <ul>
                  <li>
                    name and email address provided via the web contact form.                
                  </li>
                </ul>
              </p>
              <p>7. &#xA0;Transfer of personal data</p>
              <p>
                Your personal data may be transferred only to our data processors that we cooperate with on the basis of
                a contract or other legal act or on the grounds of Our legitimate interests as a data controller.
              </p>
              <p>
                We also use third-party service providers i.e. Google Analytics Universal, Google Analytics 4, Facebook
                Pixel to record and collect data on how you use our Website. This information is not personalized and
                helps Us improve the functioning of Our Website. We use GetResponse for email marketing.
              </p>
              <p>&#x200D;</p>
              <p>8. Social media plugins</p>
              <p>
                On Our Website we have included social media plugins, which means that using Website, the IP address of
                your device and the browser ID you are using are transferred to social media providers. Thanks to this
                integration, social media providers receive information that your browser has displayed Our Website,
                even if you do not have a profile with this social media provider or if you are not logged in at the
                same time.
              </p>
              <p>
                Activating the buttons establishes a direct connection to the server of the respective social network
                which may gather data from your device.
              </p>
              <p>
                Please note that We do not have any influence whatsoever on the scope of data gathered by the social
                networks through their buttons. More details of the purpose and scope of the data gathered and how the
                respective social networks process and use this data as well as details of your rights and the relevant
                setting options to protect your privacy you can find on the following websites:
              </p>
              <p>
                Meta Platforms Ireland Ltd., Ireland: Facebook:{' '}
                <a href='https://pl-pl.facebook.com/privacy/explanation'>
                  https://pl-pl.facebook.com/privacy/explanation
                </a>{' '}
                <br />
                Instagram:{' '}
                <a href='https://help.instagram.com/519522125107875/'>https://help.instagram.com/519522125107875/</a> -
                Facebook and Instagram are subject to EU-US Privacy-Shield, www.privacyshield.gov/EU-US-Framework;
              </p>
              <p>
                Twitter, Inc., USA: <a href='https://twitter.com/en/privacy'>https://twitter.com/en/privacy</a>- Twitter
                is subject to EU-US Privacy-Shield, www.privacyshield.gov/EU-US-Framework;
              </p>
              <p>
                LinkedIn Corporation, USA:{' '}
                <a href='https://www.linkedin.com/legal/privacy-policy?_l=pl_PL'>
                  https://www.linkedin.com/legal/privacy-policy?_l=pl_PL &#x2013; LinkedIn{' '}
                </a>
                (and Slideshare) is subject to EU-US Privacy-Shield, www.privacyshield.gov/EU-US-Framework
              </p>
              <p>&#x200D;</p>
              <p>
                9. Your personal data will be kept:
                <br />
              </p>
              <ul>
                <li>
                  for the purposes of answering your contact request &#x2013; from the day you submit your request and
                  up to the time your request is answered or otherwise resolved;
                </li>
                <li>
                  in case your personal data is processed on the basis of your consent &#x2013; from the day you give
                  your consent and up to the day you withdraw your consent;
                </li>
                <li>for the purposes of analyzing how you use Our Website, improving Website`s functionalities</li>
              </ul>
              <p>&#x200D;</p>
              <p>&#x200D;</p>
              <p>
                &#x200D;
                <strong>YOUR RIGHTS CONCERNING OUR DATA PROCESSING PROCESS </strong>
              </p>
              <p>
                <strong>&#x200D;</strong>
              </p>
              <p>
                <strong>&#x200D;</strong>You have the right to:
                <br />
              </p>
              <ul>
                <li>access your personal data, to receive a copy of your personal data;</li>
                <li>obtain the rectification of inaccurate data, deletion or restriction of processing;</li>
                <li>
                  in case when the legal basis of processing your data is Our legitimate interests as a data controller
                  you have the right to object to processing of your personal data;
                </li>
                <li>
                  to withdraw your consent at any time &#x2013; this will not affect the lawfulness of processing based
                  on consent before its withdrawal;
                </li>
                <li>
                  in case your personal data is processed on the basis of your consent you have the right to receive the
                  personal data concerning you, which you have provided to Us, in a structured, commonly used and
                  machine-readable format and have the right to transmit those data to another controller;
                </li>
                <li>to lodge a complaint with a supervisory authority and to an effective judicial remedy.</li>
              </ul>
              <p>
                In order to execute any of the abovementioned rights please contact Us in one of the ways indicated at
                the beginning of this document.
              </p>
              <p>&#x200D;</p>
              <p>&#x200D;</p>
              <p>
                &#x200D;<strong>COOKIE POLICY </strong>
                <br />
                <br />
                <br />
                Our Website uses cookie files. Cookie files are small text files sent by our server and stored by your
                browser on your device. When your browser connects again with our website, we can track the type of
                device you&apos;re using, enabling faster and more convenient browsing of the website.{' '}
              </p>
              <p>
                &#x200D;
                <br />
                1. Cookie files are used to optimize the use of Our Website. They allow to recognize user&#x2019;s
                device, to display the site adequately to their individual needs and to improve the content according to
                the user&#x2019;s interests.{' '}
              </p>
              <p>
                &#x200D;
                <br />
                2. The following types of cookie files are used within The Website:
                <br />
              </p>
              <ul>
                <li>
                  persistent cookie files that stay in one of your browser&apos;s subfolders until you delete them
                  manually or your browser deletes them based on the duration period contained within the persistent
                  cookie&apos;s file
                </li>
              </ul>
              <p>
                &#x200D;
                <br />
                3. If you don&#x2019;t want your cookies to be stored by Us, you can change the settings on your device
                at any time. These settings can be changed in particular to block automated acceptance of cookie files
                in web browser settings or to inform on each storage of cookie files on the user&apos;s device.
                <br />
              </p>
              <p>
                Detailed information about the possibility and methods of cookie files support is available in the
                settings of the web browser you are using.{' '}
              </p>
              <p>
                On the following pages you can get additional information - describing the possibilities of configuring
                cookies for the most popular browsers:
                <br />
              </p>
              <ul>
                <li>
                  Google Chrome &#xA0;
                  <a href='https://support.google.com/chrome/answer/95647?Every=GENIE.Platform%3DDesktop&amp;hl=en'>
                    https://support.google.com/chrome/answer/95647?Every=GENIE.Platform%3DDesktop&amp;hl=en
                  </a>
                </li>
                <li>
                  Windows Internet Explorer{' '}
                  <a href='https://support.microsoft.com/fil-ph/help/17442/windows-internet-explorer-delete-manage-cookies'>
                    https://support.microsoft.com/fil-ph/help/17442/windows-internet-explorer-delete-manage-cookies
                  </a>
                </li>
                <li>
                  Mozilla Firefox{' '}
                  <a href='https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer'>
                    https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer
                  </a>
                </li>
                <li>
                  Opera &#xA0;
                  <a href='https://help.opera.com/en/latest/web-preferences/#cookies'>
                    https://help.opera.com/en/latest/web-preferences/#cookies
                  </a>
                </li>
                <li>
                  Apple Safari{' '}
                  <a href='https://support.apple.com/en-us/guide/safari/manage-cookies-and-website-data-sfri11471/mac'>
                    https://support.apple.com/en-us/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                  </a>
                </li>
              </ul>
              <p>
                <a href='https://support.apple.com/en-us/guide/safari/manage-cookies-and-website-data-sfri11471/mac'>
                  &#x200D;
                </a>
                <br />
                4. We use the Google Analytics to record and collect data about the use of Our Website. This information
                is not personalized and helps us improve the operation of Our Website. Google Analytics is a tool by
                which we can measure your interactions with content on Our Website. When navigating between individual
                websites, Google Analytics provides us with JavaScript tags (libraries) to log information about the
                page you visited, for example the page URL. Google Analytics JavaScript libraries use HTTP cookie files
                to &quot;remember&quot; what you did on previous pages and how you used Our Website.
              </p>
              <p>
                You can block Google Analytics sharing information about your site activity. To do this, please install
                the add-on available at the link:{' '}
                <a href='https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh?hl=en.'>
                  https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh?hl=en.
                </a>
              </p>
              <p>
                For more information on how Google uses your data, please view:{' '}
                <a href='https://support.google.com/analytics/answer/6004245'>
                  https://support.google.com/analytics/answer/6004245.
                </a>
              </p>
              <p>
                5. We use Google signals which enable include aggregated data from Google users who have left Ads
                Personalization turned on:{' '}
                <a href='https://support.google.com/analytics/answer/7532985?hl=en#intro&zippy=%2Cin-this-article'>
                  https://support.google.com/analytics/answer/7532985.
                </a>{' '}
                .
              </p>
              <p>
                You can manage your Off-Facebook Activity. To do this, please click on the link: 
                <a href='https://adssettings.google.com/authenticated'>https://adssettings.google.com/authenticated.</a>
              </p>
              <p>
                You can turn off personalized ads. For more information on your ads settings, please view:: 
                <a href='https://www.facebook.com/off_facebook_activity/'>
                  https://www.facebook.com/off_facebook_activity/.
                </a>
              </p>
              <p>
                6. We use Facebook Pixel to track conversions and measure return on investment of Facebook Ads. Facebook
                Pixel is an analytics tool by which we can measure your interactions with content on Our Website. When
                navigating between individual websites, Facebook Pixel provides us with JavaScript tags (libraries) to
                log information about the page you visited, for example the page URL. Facebook Pixel JavaScript
                libraries use HTTP cookie files to "remember" what you did on previous pages and how you used Our
                Website. No personal information is collect as a result of using Facebook pixel.
              </p>
              <p>
                You can manage your Off-Facebook Activity. To do this, please click on the link: 
                <a href='https://www.facebook.com/off_facebook_activity/'>
                  https://www.facebook.com/off_facebook_activity/.
                </a>
              </p>
              <p>
                7. We use Hotjar in order to better understand our users’ needs and to optimize this service and
                experience. Hotjar is a technology service that helps us better understand our users’ experience (e.g.
                how much time they spend on which pages, which links they choose to click, what users do and don’t like,
                etc.) and this enables us to build and maintain our service with user feedback. Hotjar uses cookies and
                other technologies to collect data on our users’ behavior and their devices. This includes a device's IP
                address (processed during your session and stored in a de-identified form), device screen size, device
                type (unique device identifiers), browser information, geographic location (country only), and the
                preferred language used to display our website. Hotjar stores this information on our behalf in a
                pseudonymized user profile. Hotjar is contractually forbidden to sell any of the data collected on our
                behalf.
              </p>
              <p>
                For further details, please see the ‘about Hotjar’ section of{' '}
                <a href='https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar'>
                  Hotjar’s support site
                </a>
                .
              </p>
              <p>
                8. We use Google Ads cookies to monitor the results of the advertisement, including remarketing
                campaigns. We use only Google tools to conduct these campaigns.
              </p>
              <p>
                For further details, please visit information provided by Google:{' '}
                <a href='https://policies.google.com/privacy'>Google Privacy Policy</a>. You can control{' '}
                <a href='https://adssettings.google.com'>Ad personalization</a> settings.
              </p>
            </div>
          </article>
        </div>
      </Container>
    </Page>
  )
}

export default PrivacyPolicy
