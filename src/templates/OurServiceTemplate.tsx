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
  SectionTitle,
} from '../components/shared/index.styled'
import { BlackButtonHeader } from '../components/home/HeroHeaderImages'
import styled from 'styled-components'
import variables from '../styles/variables'
import { AuthorData } from './post/AuthorData'
import TeamMembers from './../components/subcomponents/TeamMembers'
import SuccessStoryBox from '../components/home/SuccessStoryBox'
import { BlockSmall, ProjectCustomSection, ProjectsLink } from '../components/home/Projects'
import { routeLinks } from '../config/routing'

const CustomSectionOurService = styled(CustomSection)`
  padding-top: ${variables.pxToRem(26)};

  @media ${variables.device.mobile} {
    && h1 {
      text-align: center;
    }
  }
`

const Section = styled.section`
  padding: 0 0 11.625rem;
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
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(28)};
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
  font: normal normal bold ${variables.pxToRem(32)} / ${variables.pxToRem(40)} Lato;
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
const OurServiceTitle = styled(CustomSectionTitle)`
  margin-top: 0;
`

export default function Template({
  data,

  // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  const image = getImage(page.image_our_service)
  data.markdownRemark.frontmatter

  const [show, setShow] = useState({})

  const handleShow = id => {
    setShow(prevshow => ({
      ...prevshow,
      [id]: !prevshow[id],
    }))
  }

  return (
    <Page>
      <HelmetTitleDescription title={page.meta_title} description={page.meta_description} />
      <CustomSectionOurService>
        <CustomPageTitle>{page.title}</CustomPageTitle>
      </CustomSectionOurService>

      <GatsbyImage image={image} alt={page.image_alt_our_service} className='about-img' quality='100' />
      <Section>
        <CustomSection>
          <CustomSectionInner>
            <TextRegular className='content'>
              <Content dangerouslySetInnerHTML={{ __html: page.description }} />

              {page.description}
            </TextRegular>
            <Link to={''}>
              <BlackButtonHeader>{page.button}</BlackButtonHeader>
            </Link>
          </CustomSectionInner>
        </CustomSection>
      </Section>

      {/* case studies */}
      {page.show_case_study && (
        <ProjectCustomSection>
          <OurServiceTitle>success stories</OurServiceTitle>
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
              data.markdownRemark.frontmatter.project.map(({ frontmatter }, ix) => {
                console.log('ffff')
                console.log(data.markdownRemark.frontmatter.project)
                const project = frontmatter
                return (
                  <>
                    <SuccessStoryBox
                      key={ix}
                      title={project.title}
                      image={project.image}
                      slug={project.slug}
                      className={`is-pulled-${ix % 2 ? 'right' : 'left'}`}
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

      <CustomSection PaddingMobileProps='0 1.125rem 1rem'>
        <Section>
          <CustomSectionInner>
            <Content dangerouslySetInnerHTML={{ __html: html }} />
            <Link to={''}>
              <BlackButtonHeader>{page.button2}</BlackButtonHeader>
            </Link>
          </CustomSectionInner>
        </Section>
      </CustomSection>

      {page.show_technology_stack && <TechnologyTags />}
      <CustomSectionTitle margin='11.625rem 0 6.5625rem '>meet our {page.title} team</CustomSectionTitle>
      <TeamMembers authorIdsArray={page.team_members} isOurServiceTemplate={true} />

      {/* FAQs */}
      <CustomSection PaddingMobileProps='0 1.125rem 0'>
        <CustomSectionInner>
          <CustomSectionTitle margin='11.625rem 0 6.5625rem '>{page.title} FAQ's</CustomSectionTitle>

          {data.markdownRemark.frontmatter.faqs &&
            data.markdownRemark.frontmatter.faqs.map(({ frontmatter }, id) => {
              const faq = frontmatter

              return (
                <FaqWrapper key={faq.question}>
                  {faq.answer ? (
                    <Question onClick={() => handleShow(id)} shown={show[id]}>
                      {faq.question}
                      <span>
                        <img src='/images/arrowFaqs.svg' alt='' />
                      </span>
                    </Question>
                  ) : null}

                  {show[id] ? <FaqsTextRegural className='hidden'>{faq.answer}</FaqsTextRegural> : null}
                </FaqWrapper>
              )
            })}
        </CustomSectionInner>
      </CustomSection>
      <Contact title={page.title_contact} subtitle={page.description_contact} />
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
