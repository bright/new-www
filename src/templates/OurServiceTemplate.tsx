import React, { useState, useEffect, useRef } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { useWindowSize } from '../components/utils/use-windowsize'
import { Contact } from '../components/shared/Contact'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'

import {
  CustomPageTitle,
  CustomSectionInner,
  CustomSection,
  TextRegular,
  CustomSectionTitle,
  Section,
} from '../components/shared/index.styled'

import TeamMembers from './../components/subcomponents/TeamMembers'
import SuccessStoryBox from '../components/home/SuccessStoryBox'
import { BlockSmall, ProjectCustomSection, ProjectsLink } from '../components/home/Projects'
import { routeLinks } from '../config/routing'
import ReactMarkdown from 'react-markdown'
import { kebabCase } from './../helpers/pathHelpers'
import {
  CustomSectionOurService,
  ImageWrapper,
  Content,
  BlackButtonOurService,
  FaqWrapper,
  Question,
  FaqsTextRegural,
} from './styled/OurServiceTemplateStyled'
import { FaqStructuredData } from '../FaqStructuredData'

export default function Template({ data, params, pageContext }: any) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  const image = getImage(page.image_our_service)
  const myRef = useRef(null)
  const { faqTitle } = pageContext

  useEffect(() => {
    if (faqTitle) {
      const index = faqs.map(({ frontmatter: faq }: any) => kebabCase(faq.question)).indexOf(kebabCase(faqTitle))

      if (index >= 0) {
        handleShow(index)
        const yOffset = -100
        const y = myRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
        setTimeout(() => {
          window.scrollTo({
            top: y,
          })
        }, 100)
      }
    }
  }, [])

  const { width } = useWindowSize()
  const breakpoint = 991

  const [show, setShow] = useState<any>({})

  const handleShow = (i: number) => {
    const title = kebabCase(faqs[i].frontmatter.question)

    if (!show[i]) {
      const ourAreasFaqLink = routeLinks.ourAreas({
        service: kebabCase(name),
        faqTitle: title,
      })
      window.history.pushState({ path: ourAreasFaqLink }, '', ourAreasFaqLink)
    } else {
      const showArray = Object.keys(show).map(function (k) {
        return { value: show[k], index: k }
      })
      const nearestOpenedFaq = showArray.find(item => item.value && item.index != i)

      const openedFaqTitle = nearestOpenedFaq ? faqs[nearestOpenedFaq.index].frontmatter.question : ''

      const ourAreasFaqLink = routeLinks.ourAreas({
        service: kebabCase(name),
        faqTitle: kebabCase(openedFaqTitle),
      })
      window.history.pushState({ path: ourAreasFaqLink }, '', ourAreasFaqLink)
    }

    setShow((prevshow: any) => ({
      ...prevshow,
      [i]: !prevshow[i],
    }))
  }

  const {
    faqs,
    name,
    image_alt_our_service,
    meta_title,
    meta_description,
    title,
    description,
    button,
    title_team,
    team_members,
    button2,
    show_technology_stack,
    show_case_study,
    title_case_study,
    title_faqs,
    title_contact,
    description_contact,
    intro,
    project,
  } = page

  return (
    <Page>
      <HelmetTitleDescription title={meta_title} description={meta_description} />
      <CustomSectionOurService>
        <CustomSectionInner maxWidth='910px'>
          <CustomPageTitle>{title}</CustomPageTitle>
        </CustomSectionInner>
      </CustomSectionOurService>
      {width <= breakpoint && null}
      <CustomSection paddingProps='0 15rem 3.5rem '>
        <CustomSectionInner maxWidth='956px'>
          <Link to={'#contactForm'}>
            <BlackButtonOurService>{button}</BlackButtonOurService>
          </Link>
        </CustomSectionInner>
      </CustomSection>

      <ImageWrapper>
        <GatsbyImage image={image} alt={image_alt_our_service} className='about-img' quality='100' />
      </ImageWrapper>
      <Section>
        <CustomSection paddingProps='2rem 15rem 0rem 15rem'>
          <CustomSectionInner>
            <TextRegular className='content'>
              <Content>
                <ReactMarkdown children={description} />
              </Content>
            </TextRegular>
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{button}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </CustomSection>
      </Section>
      <CustomSection paddingProps='0 0 2rem' paddingMobileProps='0 1.125rem 1rem'>
        <CustomSectionTitle mobileMargin='3rem 0 0.25rem' margin='0rem 0 6.5625rem ' laptopMargin='0 0 5.1875rem'>
          {title_team}
        </CustomSectionTitle>
        <TeamMembers authorIdsArray={team_members} isOurServiceTemplate={true} />
      </CustomSection>

      <CustomSection paddingProps='0 15rem 5.625rem 15rem' paddingMobileProps='0 1.125rem 4rem'>
        <Section>
          <CustomSectionInner>
            <Content className='content' dangerouslySetInnerHTML={{ __html: html }} />
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{button2}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </Section>
      </CustomSection>

      {show_technology_stack && <TechnologyTags />}

      {show_case_study && (
        <ProjectCustomSection paddingMobileProps='0 1.125rem 0'>
          <CustomSectionTitle mobileMargin='5.125rem 0 2.75rem'>{title_case_study}</CustomSectionTitle>
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

            {project &&
              project.map(({ frontmatter }: any, i: number) => {
                const { title, image, slug } = frontmatter
                return (
                  <>
                    <SuccessStoryBox
                      key={i}
                      title={title}
                      image={image}
                      slug={slug}
                      className={`is-pulled-${i % 2 ? 'right' : 'left'}`}
                    />
                  </>
                )
              })}
            <ProjectsLink to={routeLinks.projects}>
              <BlockSmall className='is-pulled-left'>see all case studies</BlockSmall>
            </ProjectsLink>
          </div>
        </ProjectCustomSection>
      )}

      <CustomSection paddingProps='0rem 15rem 2rem 15rem' paddingMobileProps='0 1.125rem 0'>
        <CustomSectionInner>
          {show_case_study ? (
            <CustomSectionTitle margin='0rem 0 6.5625rem ' mobileMargin='0 0 2.75rem '>
              {title_faqs}
            </CustomSectionTitle>
          ) : (
            <CustomSectionTitle margin='11.625rem 0 6.5625rem ' mobileMargin='5.125rem 0 2.75rem '>
              {title_faqs}
            </CustomSectionTitle>
          )}

          {faqs &&
            faqs.map(({ frontmatter }: any, i: number) => {
              const { question, answer } = frontmatter
              return (
                <FaqWrapper ref={kebabCase(question) == kebabCase(faqTitle) ? myRef : null} key={question}>
                  {answer ? (
                    <Question onClick={() => handleShow(i)} shown={show[i]}>
                      <ReactMarkdown children={question} />

                      <span>
                        <img src='/images/arrowFaqs.svg' alt='' />
                      </span>
                    </Question>
                  ) : null}

                  {show[i] ? (
                    <FaqsTextRegural className='content'>
                      {' '}
                      <ReactMarkdown children={answer} />
                    </FaqsTextRegural>
                  ) : null}
                </FaqWrapper>
              )
            })}
        </CustomSectionInner>
      </CustomSection>
      <Contact title={title_contact} subtitle={description_contact} isOurServiceTemplate={true} />

      <FaqStructuredData faqs={faqs} />
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
            slug
          }
        }
        meta_title
        meta_description
        title
        intro
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
        name
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
