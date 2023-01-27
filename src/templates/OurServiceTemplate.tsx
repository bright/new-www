import React, { useState, useEffect, useRef, PropsWithChildren } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Contact } from '../components/shared/Contact'
import TechnologyTags from '../components/shared/TechnologyTags'
import { Page } from '../layout/Page'
import { HelmetMetaData } from '../meta/HelmetMetaData'

import {
  CustomSectionInner,
  CustomSection,
  TextRegular,
  CustomSectionTitle,
  Section,
} from '../components/shared/index.styled'

import TeamMembers from './../components/subcomponents/TeamMembers'
import { Projects } from '../components/home/Projects'
import { routeLinks } from '../config/routing'
import { kebabCase } from './../helpers/pathHelpers'
import {
  CustomSectionOurService,
  ImageWrapper,
  Content,
  BlackButtonOurService,
  FaqWrapper,
  Question,
  FaqsTextRegural,
  OurServiceHideTablet,
  OurServicePageTitle,
  OurServiceSection,
} from './styled/OurServiceTemplateStyled'
import { FaqStructuredData } from '../FaqStructuredData'
import { ProjectModel } from '../models/gql'

export default function Template({
  data,
  pageContext,
  children,
}: PropsWithChildren<{ data: { mdx: any }; pageContext: { faqTitle: string } }>) {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter: page } = mdx
  const image = getImage(page.image_our_service)
  const myRef = useRef<HTMLDivElement>(null)
  const { faqTitle } = pageContext

  useEffect(() => {
    if (faqTitle) {
      const index = faqs.map(({ frontmatter: faq }: any) => kebabCase(faq.question)).indexOf(kebabCase(faqTitle))

      if (index >= 0 && myRef.current) {
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

  const [show, setShow] = useState<any>({})

  const handleShow = (i: number) => {
    const title = kebabCase(faqs[i].frontmatter.question)

    if (!show[i]) {
      const ourAreasFaqLink = routeLinks.ourAreas({
        service: kebabCase(slug),
        faqTitle: title,
      })
      window.history.pushState({ path: ourAreasFaqLink }, '', ourAreasFaqLink)
    } else {
      const showArray = Object.keys(show).map(function (k) {
        return { value: show[k], index: k }
      })
      const nearestOpenedFaq = showArray.find(item => item.value && item.index != i.toString())

      const openedFaqTitle = nearestOpenedFaq ? faqs[nearestOpenedFaq.index].frontmatter.question : ''

      const ourAreasFaqLink = routeLinks.ourAreas({
        service: kebabCase(slug),
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
    project: projects,
    slug,
  } = page

  return (
    <Page>
      <HelmetMetaData title={meta_title} description={meta_description} />
      <CustomSectionOurService>
        <CustomSectionInner
          maxWidth='70%'
          tabletXLMaxWidth='80%'
          laptopMaxWidth='70%'
          mobileMaxWidth='100%'
          tabletMaxWidth='90%'
        >
          <OurServicePageTitle>{title}</OurServicePageTitle>
        </CustomSectionInner>
      </CustomSectionOurService>
      <OurServiceHideTablet>
        <CustomSection
          paddingProps='0 15rem 2.125rem '
          paddingTabletXL='0 9rem 1.3125rem '
          paddingLaptop='0 6rem 1.6875rem '
        >
          <CustomSectionInner maxWidth='956px'>
            <Link to={'#contactForm'}>
              <BlackButtonOurService marginTop='0'>{button}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </CustomSection>
      </OurServiceHideTablet>

      <ImageWrapper>
        {image && <GatsbyImage image={image} alt={image_alt_our_service} className='about-img' />}
      </ImageWrapper>
      <Section>
        <CustomSection paddingProps='2rem 15rem 0rem 15rem'>
          <CustomSectionInner>
            <TextRegular className='content'>
              {description && <Content dangerouslySetInnerHTML={{ __html: description.html }} />}
            </TextRegular>
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{button}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </CustomSection>
      </Section>
      <CustomSection paddingProps='0 0 2rem' paddingMobileProps='0 1.125rem 1rem'>
        <CustomSectionTitle mobileMargin='3rem 0 2.25rem' margin='0rem 0 6.5625rem ' laptopMargin='0 0 5.1875rem'>
          {title_team}
        </CustomSectionTitle>
        <TeamMembers authorIdsArray={team_members} isOurServiceTemplate={true} />
      </CustomSection>

      <CustomSection paddingProps='0 15rem 5.625rem 15rem' paddingMobileProps='0 1.125rem 4rem'>
        <OurServiceSection>
          <CustomSectionInner>
            <Content className='content'>{children}</Content>
            <Link to={'#contactForm'}>
              <BlackButtonOurService>{button2}</BlackButtonOurService>
            </Link>
          </CustomSectionInner>
        </OurServiceSection>
      </CustomSection>

      {show_technology_stack && <TechnologyTags />}

      {show_case_study && (
        <div>
          <CustomSectionTitle mobileMargin='5.125rem 0 2.75rem'>{title_case_study}</CustomSectionTitle>
          <Projects
            isFetchProject={false}
            projectsArray={projects.map((el: { frontmatter: ProjectModel }) => el.frontmatter)}
            isSelectedTag={false}
          />
        </div>
      )}

      <CustomSection paddingProps='0rem 15rem 2rem 15rem' paddingMobileProps='0 1.125rem 0'>
        <CustomSectionInner>
          {show_case_study ? (
            <CustomSectionTitle
              margin='0rem 0 6.5625rem '
              mobileMargin='5.125rem 0 2.75rem '
              laptopMargin='0 0 5.185rem'
            >
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
                      {question}

                      <span>
                        <img src='/images/arrowFaqs.svg' alt='arrow Faqs' />
                      </span>
                    </Question>
                  ) : null}

                  {show[i] && answer ? (
                    <FaqsTextRegural className='content' dangerouslySetInnerHTML={{ __html: answer.html }} />
                  ) : null}
                </FaqWrapper>
              )
            })}
        </CustomSectionInner>
      </CustomSection>
      <Contact
        title={title_contact}
        subtitle={description_contact}
        isOurServiceTemplate={true}
        formButton='Business Contact Form Button'
        actionFormButton='Click Submit Business Form'
      />

      <FaqStructuredData faqs={faqs} />
    </Page>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        team_members
        faqs {
          frontmatter {
            answer {
              html
            }
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
        slug
        description_mdx {
          html
        }
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
    }
  }
`
