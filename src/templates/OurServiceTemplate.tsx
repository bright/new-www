import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Contact } from '../components/shared/Contact'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import { graphql, Link } from 'gatsby'
import {
  CustomPageTitle,
  CustomTextRegular,
  CustomSectionInner,
  CustomSection,
  TextRegular,
  CustomSectionTitle,
} from '../components/shared/index.styled'
import styled from 'styled-components'
import variables from '../styles/variables'
import TeamMembers from './../components/subcomponents/TeamMembers'
import SuccessStoryBox from '../components/home/SuccessStoryBox'
import { BlockSmall, ProjectCustomSection, ProjectsLink } from '../components/home/Projects'
import { routeLinks } from '../config/routing'
import { BlackButton } from '../components/about-us/about-us.styled'
import ReactMarkdown from 'react-markdown'

const CustomSectionOurService = styled(CustomSection)`
  padding-top: ${variables.pxToRem(26)};

  @media ${variables.device.mobile} {
    && h1 {
      text-align: center;
    }
  }
`

const Section = styled.section`
  padding: 0 0 ${variables.pxToRem(186)};
  color: #131214;
  @media ${variables.device.mobile} {
    padding: 0 0 ${variables.pxToRem(82)};
  }
`
const Content = styled.div`
  && h2,
  h3 {
    margin: ${variables.pxToRem(64)} 0 ${variables.pxToRem(36)};
    &:first-of-type {
      margin-top: 0;
    }
  }
  && h2 {
    font-size: ${variables.pxToRem(32)};
    color: #131214;
    font-weight: 900;
    line-height: ${variables.pxToRem(40)};
    & :first-of-type {
      margin: 0 0 ${variables.pxToRem(36)};
    }
    @media ${variables.device.mobile} {
      font-size: ${variables.pxToRem(22)};
      & :first-of-type {
        margin: ${variables.pxToRem(82)} 0 ${variables.pxToRem(36)};
      }
    }
  }
  && h3 {
    font-size: 2rem;
    color: #131214;
    font-weight: 600;
    line-height: ${variables.pxToRem(40)};
    @media ${variables.device.mobile} {
      font-size: ${variables.pxToRem(18)};
      font-weight: 800;
      line-height: ${variables.pxToRem(30)};
    }
  }
  && p {
    font-size: ${variables.pxToRem(22)};
    line-height: ${variables.pxToRem(40)};
    color: #131214;
    opacity: 0.75;
    font-family: ${variables.font.customtext.lato};
    margin-bottom: ${variables.pxToRem(16)};

    & span {
      background-color: ${variables.color.primary};
      opacity: 1;
      font-weight: 900;
    }
  }
`
const FaqWrapper = styled.div`
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`
export const Question = styled.h3<{ shown: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font: normal normal 900 ${variables.pxToRem(32)} / ${variables.pxToRem(40)} Lato;
  letter-spacing: 0px;
  color: #000000;
  padding: ${variables.pxToRem(35)} 0;
  cursor: pointer;
  & span img {
    ${({ shown }) => (shown ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)')};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(20)};
    padding: ${variables.pxToRem(18)} 0;
  }
`
const FaqsTextRegural = styled(CustomTextRegular)`
  padding-bottom: ${variables.pxToRem(36)};

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(28)};
    padding-bottom: ${variables.pxToRem(18)};
    padding-top: ${variables.pxToRem(6)};
  }
`

const BlackButtonOurService = styled(BlackButton)`
  margin: 0 auto;
  margin-top: ${variables.pxToRem(105)};
  display: flex;
  justify-content: center;
  text-align: center;

  @media ${variables.device.mobile} {
    margin-top: ${variables.pxToRem(64)};
  }
`
const ImageWrapper = styled.div`
  && .about-img {
    display: block;
    margin: ${variables.pxToRem(30)} auto;
  }
`

export default function Template({ data }: any) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  const image = getImage(page.image_our_service)
  data.markdownRemark.frontmatter

  const [show, setShow] = useState<any>({})

  const handleShow = (i: number) => {
    setShow((prevshow: any) => ({
      ...prevshow,
      [i]: !prevshow[i],
    }))
  }
  let faqSchema = {}
  const FAQ = data.markdownRemark.frontmatter.faqs.map(({ frontmatter }: any) => {
    const faq = frontmatter
    return {
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }
  })
  faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [FAQ],
  }
  console.log(page.description)
  return (
    <Page>
      <HelmetTitleDescription title={page.meta_title} description={page.meta_description}>
        {Object.keys(faqSchema).length && <script type='application/ld+json'>{JSON.stringify(faqSchema)}</script>}
      </HelmetTitleDescription>
      <CustomSectionOurService>
        <CustomPageTitle>{page.title}</CustomPageTitle>
      </CustomSectionOurService>
      <ImageWrapper>
        <GatsbyImage image={image} alt={page.image_alt_our_service} className='about-img' quality='100' />
      </ImageWrapper>
      <Section>
        <CustomSection paddingProps='2rem 15rem 0rem 15rem'>
          <CustomSectionInner>
            <TextRegular className='content'>
              <Content>
                <ReactMarkdown children={page.description} />
              </Content>
            </TextRegular>
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{page.button}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </CustomSection>
      </Section>
      <CustomSection paddingProps='0 0 4rem' paddingMobileProps='0 1.125rem 1rem'>
        <CustomSectionTitle mobileMargin='0 0 4rem' margin='0rem 0 6.5625rem '>
          {page.title_team}
        </CustomSectionTitle>
        <TeamMembers authorIdsArray={page.team_members} isOurServiceTemplate={true} />
      </CustomSection>

      <CustomSection paddingProps='0 15rem 0 15rem' paddingMobileProps='0 1.125rem 1rem'>
        <Section>
          <CustomSectionInner>
            <Content dangerouslySetInnerHTML={{ __html: html }} />
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{page.button2}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </Section>
      </CustomSection>

      {page.show_technology_stack && <TechnologyTags />}
      {page.show_case_study && (
        <ProjectCustomSection paddingMobileProps='0 1.125rem 0'>
          <CustomSectionTitle mobileMargin='5.125rem 0 2.75rem'>{page.title_case_study}</CustomSectionTitle>
          <div className='is-clearfix success-story-wrapper'>
            <BlockSmall className='is-pulled-right'>
              <span>visit our online portfolio:</span>
              <a target='_blank' href='https://www.behance.net/BrightInventions/'>
                <img src='/images/success-story-home-page/behance.svg' alt='Behance' />
              </a>
              <a target='_blank' href='https://dribbble.com/Bright_Inventions/'>
                <img src='/images/success-story-home-page/icon2.svg' alt='Dribbble' />
              </a>
            </BlockSmall>

            {data.markdownRemark.frontmatter.project &&
              data.markdownRemark.frontmatter.project.map(({ frontmatter }: any, i: number) => {
                const project = frontmatter
                return (
                  <>
                    <SuccessStoryBox
                      key={i}
                      title={project.title}
                      image={project.image}
                      slug={project.slug}
                      className={`is-pulled-${i % 2 ? 'right' : 'left'}`}
                    />
                  </>
                )
              })}
            <BlockSmall className='is-pulled-left'>
              <ProjectsLink to={routeLinks.projects}>see all case studies</ProjectsLink>
            </BlockSmall>
          </div>
        </ProjectCustomSection>
      )}

      <CustomSection paddingProps='0rem 15rem 4rem 15rem' paddingMobileProps='0 1.125rem 0'>
        <CustomSectionInner>
          {page.show_case_study ? (
            <CustomSectionTitle margin='0rem 0 6.5625rem ' mobileMargin='0 0 2.75rem '>
              {page.title_faqs}
            </CustomSectionTitle>
          ) : (
            <CustomSectionTitle margin='11.625rem 0 6.5625rem ' mobileMargin='5.125rem 0 2.75rem '>
              {page.title_faqs}
            </CustomSectionTitle>
          )}

          {data.markdownRemark.frontmatter.faqs &&
            data.markdownRemark.frontmatter.faqs.map(({ frontmatter }: any, i: number) => {
              const faq = frontmatter

              return (
                <FaqWrapper key={faq.question}>
                  {faq.answer ? (
                    <Question onClick={() => handleShow(i)} shown={show[i]}>
                      <ReactMarkdown children={faq.question} />

                      <span>
                        <img src='/images/arrowFaqs.svg' alt='' />
                      </span>
                    </Question>
                  ) : null}

                  {show[i] ? (
                    <FaqsTextRegural>
                      {' '}
                      <ReactMarkdown children={faq.answer} />
                    </FaqsTextRegural>
                  ) : null}
                </FaqWrapper>
              )
            })}
        </CustomSectionInner>
      </CustomSection>
      <Contact title={page.title_contact} subtitle={page.description_contact} isOurServiceTemplate={true} />
    </Page>
  )
}

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      frontmatter {
        team_members
        faqs {
          frontmatter {
            answer
            question
          }
        }
        project {
          frontmatter {
            description
            title
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        meta_title
        meta_description
        title
        description
        button
        button2
        show_case_study
        show_technology_stack
        title_faqs
        title_case_study
        title_team
        title_contact
        description_contact
        slug
        image_our_service {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      html
    }
  }
`
