import React, { useRef, PropsWithChildren } from 'react'
import { graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Page } from '../layout/Page'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import RatingClutch from '../assets/rating.svg'
import { useWindowSize } from '../components/utils/use-windowsize'
import { CustomSectionInner, CustomSection, TextRegular, CustomSectionTitle } from '../components/shared/index.styled'
import { Projects } from '../components/home/Projects'
import { routeLinks } from '../config/routing'
import {
  OurServiceSection,
  BulletList,
  BulletsList,
  CloutchWrapper,
  MoreButtonOurServiceWrapper
} from './Service.styled'
import { FaqStructuredData } from '../FaqStructuredData'
import { ProjectModel } from '../models/gql'
import { FlexWrapper } from '../components/shared'
import TeamMemebersSwiper from '../components/subcomponents/TeamMembersSwiper'

import { MoreButton } from '../components/shared'
import FaqsDropdown from '../components/shared/FaqsDropdown'
import { toBlogPost } from '../use-blog-posts/blog-post-frontmatter-query-result'
import { useClient } from '../hooks/useClient'
import {
  MobileOurServiceFlexWrapper,
  OurStudioPageTitle,
  StudioContent,
  SliderSection,
  ImageWrapper, HeroWrapper, CustomSectionOurService, CustomSectionOurServiceImage, FormHeading, RoundedImage
} from './Studio.styled'
import { CarouselQuotesSwiper } from '../components/shared/CarouselQuotesSwiper'
import StartProjectContact from '../components/start-project/StartProjectContact'
import styled from 'styled-components'
import variables, { deviceSize } from '../styles/variables'

const PopularBlogPosts = React.lazy(() => import('../components/shared/PopularBlogPosts'))
const TechnologyTags = React.lazy(() => import('../components/shared/TechnologyTags'))
const TeamMembers = React.lazy(() => import('../components/subcomponents/TeamMembers'))

export default function Template({ data, pageContext }: PropsWithChildren<{
  data: { service: any, related: any }
  pageContext: { faqTitle: string; faqSlug: string; language: string }
}>) {
  const { service, related } = data
  const { frontmatter: page } = service
  const posts: ReturnType<typeof toBlogPost>[] = related.edges.map((edge: any) => toBlogPost(edge.node))
  const { width } = useWindowSize()
  const breakpointTablet = 992
  const myRef = useRef<HTMLDivElement>(null)
  const { faqSlug, language } = pageContext
  const isClient = useClient()

  const {
    faqs,
    meta_title,
    meta_description,
    button,
    title_team,
    team_members,
    button2,
    show_technology_stack,
    show_case_study,
    title_case_study,
    title_faqs,
    bar_stack,
    bullet_points,
    project: projects,
    slug,
    blog_section,
    blog_section_title
  } = page

  const quotes = [
    {
      avatar_hover: (
        <StaticImage src='../../static/images/gdansk/beach.png' alt='Górki Wschodnie beach'
                     className='quote-img' />
      ),
      short_name: 'Górki Wschodnie beach',
      quote:
        'Surrounded by dunes and coastal vegetation, Górki Wschodnie Beach boasts natural beauty and serenity, making it an ideal destination for nature lovers and outdoor enthusiasts.'
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/gdansk/fortifications.png' alt='the fortifications of Gdańsk'
                     className='quote-img' />
      ),
      short_name: 'the fortifications of Gdańsk',
      quote:
        'These historic structures stand as beloved landmarks, providing a picturesque backdrop for exploring Gdansk\'s historic streets, charming squares, and architectural treasures.'
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/gdansk/park.png' alt='Jaśkowa Valley Park' className='quote-img' />
      ),
      short_name: 'Jaśkowa Valley Park',
      quote:
        'The urban park only 20 minutes walk from our office offers a peaceful retreat from the bustling city life.'
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/gdansk/shipyard.png' alt='post-shipyard industrial cultural center'
                     className='quote-img' />
      ),
      short_name: 'post-shipyard industrial cultural center',
      quote:
        'Once a hub for industrial activity, the streets such as Elektryków and Narzędziowa have transformed blossoming into a vibrant cultural hotspot.'
    }
  ]

  return (
    <Page>
      <HelmetMetaData title={meta_title} description={meta_description} />

      <HeroWrapper>
        <CustomSectionOurService
          paddingProps='3.4375rem 0 0 15rem '
          paddingLaptop='6.4375rem 0 0 6rem'
          paddingTabletXL='7.5rem 0 0 8.5625rem '
          paddingTablet='1.5625rem 2.25rem 0'
          paddingMobileProps='3rem 1.125rem 0'
        >
          <MobileOurServiceFlexWrapper desktopDirection='column' mobileContent='space-between'>
            <FlexWrapper desktopDirection='column'>
              <CustomSection
                paddingProps='0 0 16px'
                paddingLaptop='0 0 16px'
                paddingTabletXL='0 0 4px'
                paddingTablet='0 0 16px'
                paddingMobileProps='0 0 32px'
              >
                <OurStudioPageTitle>
                  <span>meet</span>
                  <span className='highlighted-word'> best software </span>
                  <span>development studio in</span>
                  <span className='highlighted-word'> Gdańsk</span>
                </OurStudioPageTitle>
              </CustomSection>
              <BulletsList>
                {bullet_points && bullet_points.map((point: string) => <BulletList key={point}>{point}</BulletList>)}
              </BulletsList>
            </FlexWrapper>
            <FlexWrapper desktopDirection='column'>
              <MoreButtonOurServiceWrapper
                marginTop='64px'
                margin='0'
                marginTopTablet='64px'
                tabletWidth='100%'
                marginTopMobile='0'
              >
                <MoreButton href={'#contactForm'} isBlack marginTop='0' isPositionLeft className='more-button'>
                  {button}
                </MoreButton>
              </MoreButtonOurServiceWrapper>

              <CloutchWrapper>
                <FlexWrapper desktopItems='center' desktopGap='18px' tabletContent='center' mobileContent='flex-start'>
                  <TextRegular>Clutch 4.9/5</TextRegular>
                  <RatingClutch />
                </FlexWrapper>
              </CloutchWrapper>
            </FlexWrapper>
          </MobileOurServiceFlexWrapper>
        </CustomSectionOurService>
        <CustomSectionOurServiceImage
          paddingProps='3.5rem 15rem 0 0'
          paddingLaptop='3.5rem 6rem 0 0'
          paddingTabletXL='3.5rem 8.5625rem 0 0 '
          paddingTablet='2rem 0 0 0'
          paddingMobileProps='2rem 0 0 0'
        >
          <ImageWrapper>
            <StaticImage src='../../static/images/gdansk/gdansk_studio.jpg' alt='Meet us in Gdańsk' />
          </ImageWrapper>
        </CustomSectionOurServiceImage>
      </HeroWrapper>

      <CustomSection
        paddingProps='0 15rem 6.5rem 15rem'
        paddingTabletXL='0 0 6rem'
        paddingMobileProps='0 1.125rem 2rem'
        paddingTablet='0 2.25rem 0 '
        paddingLaptop='0 6rem 6.5rem'
      >
        <OurServiceSection>
          <CustomSectionInner>
            <StudioContent className='content'>
              <p>Welcome to Gdańsk, the city that embraces its 1000-year history while emerging as one of the most
                vibrant technological hubs in Poland.</p>

              <p>We are <strong>Bright Inventions – a company proudly located in the city, just 15 minutes from the
                airport</strong>. Are you currently exploring Gdansk? Why don't we grab a coffee together? Meet with our
                software engineering team and learn how together we can create software that matters.</p>

              <h2>Gdańsk from our team’s perspective</h2>
            </StudioContent>
          </CustomSectionInner>
        </OurServiceSection>

        <SliderSection
          paddingProps='2.25rem 0 2.25rem 3rem'
          paddingTabletXL='2.25rem 2.25rem 3rem'
          paddingMobileProps='0 1.125rem 3rem'
          paddingTablet='2.25rem 2.25rem 0 3rem'
          paddingLaptop='2.25rem 0 2.25rem 3rem'
        >
          <CarouselQuotesSwiper quotes={quotes} />
        </SliderSection>

        <OurServiceSection>
          <CustomSectionInner>
            <StudioContent className='content'>
              <h2>our expertise</h2>

              <p>We offer custom software development for organizations of all shapes and sizes – from emerging
                startups, mid-sized companies, and consultancy agencies, to renowned NGOs and international
                organizations.</p>

              <h3><Link to='/our-areas/iot-development/'>IoT development</Link></h3>

              <p>We specialize in <Link to='/projects/remote-patient-monitoring/'>integrating smart bluetooth devices
                into sophisticated
                systems</Link>. We have cooperated with clients representing the
                industrial, healthcare, and <Link to='/projects/system-for-restaurants/'>retail</Link> sectors.</p>

              <h3><Link to='/our-areas/healthcare-software-development/'>healthcare software development</Link></h3>

              <p>We assist our partners in developing products that have a meaningful impact on the lives of their end
                users. By building an <Link to='/projects/solution-for-parkinsons-patients/'>engagement app for
                  chronically ill
                  patients</Link>, a <Link to='/projects/pregnancy-app/'>digital guide for future
                  moms</Link>, or an <Link to='/projects/online-group-support/'>online therapy platform</Link>, we
                take part in the global digital healthcare movement.</p>

              <h3><Link to='/our-areas/mvp-development/'>MVP development</Link></h3>

              <p>We craft MVPs to quickly validate ideas for the software solutions. We've built numerous MVPs including
                a <Link to='/projects/card-tracking-system/'>humanitarian aid solution which turned into a global
                  product</Link>.</p>
            </StudioContent>

            <MoreButtonOurServiceWrapper>
              <MoreButton href={'#contactForm'} isBlack marginTop='0'>
                {button2}
              </MoreButton>
            </MoreButtonOurServiceWrapper>
          </CustomSectionInner>
        </OurServiceSection>
      </CustomSection>
      <CustomSection paddingProps='0 0 2rem' paddingMobileProps='0 1.125rem 1rem'>
        <CustomSectionTitle mobileMargin='3rem 0 2.25rem' margin='0rem 0 6.5625rem ' laptopMargin='0 0 5.1875rem'>
          {title_team}
        </CustomSectionTitle>
        <div>{width < breakpointTablet && <TeamMemebersSwiper authorIdsArray={team_members} />}</div>
        <div>
          {width >= breakpointTablet && <TeamMembers authorIdsArray={team_members} isOurServiceTemplate={true} />}
        </div>
      </CustomSection>

      {show_technology_stack && <TechnologyTags tags={bar_stack} />}

      {show_case_study && (
        <div>
          <CustomSectionTitle mobileMargin='5.125rem 0 2.75rem' laptopMargin='64px 0'>
            {title_case_study}
          </CustomSectionTitle>
          <Projects
            isFetchProject={false}
            projectsArray={projects.map((el: { frontmatter: ProjectModel }) => el.frontmatter)}
            isSelectedTag={false}
          />
        </div>
      )}

      {isClient && blog_section && <>
        <PopularBlogPosts posts={posts} title={blog_section_title} />
      </>}

      <CustomSection paddingProps='2rem 15rem 2rem 15rem' paddingLaptop='5rem 6rem 0rem'
                     paddingMobileProps='0 1.125rem 0'>
        <CustomSectionInner>
          <a href='#faqs' style={{ display: 'block' }}>
            {show_case_study ? (
              <CustomSectionTitle
                margin='0rem 0 6.5625rem '
                mobileMargin='5.125rem 0 2.75rem '
                laptopMargin='0 0 5.185rem'
                id='faqs'
              >
                {title_faqs}
              </CustomSectionTitle>
            ) : (
              <CustomSectionTitle margin='11.625rem 0 6.5625rem' mobileMargin='5.125rem 0 2.75rem' id='faqs'>
                {title_faqs}
              </CustomSectionTitle>
            )}
          </a>

          {faqs && (
            <FaqsDropdown
              faqs={faqs}
              faqSlug={faqSlug}
              generateLink={args =>
                routeLinks.ourAreas({
                  service: args.basePath,
                  faqSlug: args.faqSlug
                })
              }
              ref={myRef}
              slug={slug}
              offset={400}
            />
          )}
        </CustomSectionInner>
      </CustomSection>

      <CustomSection
        paddingProps='2.25rem 137px 5rem'
        paddingTabletXL='0 2.25rem 2.25rem 2.25rem'
        paddingMobileProps='0 1.25rem 2.25rem'
        paddingTablet='0 2.25rem 2.25rem 2.25rem'
        paddingLaptop='1rem 137px 2.25rem'
      >
        <FormHeading>
          <CustomSectionTitle margin='0'
                              mobileMargin='3.5rem 0 2.25rem'
                              laptopMargin='3.5rem 0 2.25rem'
                              tabletMargin='3.5rem 0 2.25rem'
                              tabletXLMargin='3.5rem 0 2.25rem'>
            let's chat and meet for a coffee
          </CustomSectionTitle>
          <TextRegular id='contactForm'>Once you've completed the form, let's catch up over coffee during your stay in
            Gdańsk.</TextRegular>
        </FormHeading>

        <FlexWrapper desktopGap='64px' desktopDirection='row' tabletDirection='column'>
          {width >= deviceSize.mobile && <FlexWrapper desktopDirection='column' desktopBasis='48%' desktopGap='48px'>
            <RoundedImage>
              <StaticImage src='../../static/images/gdansk/gdansk_contact.jpg' alt='Contact in Gdańsk' />
            </RoundedImage>
          </FlexWrapper>}
          <StartProjectContact
            formButton='Business Contact Form Button'
            actionFormButton='Click Submit Business Form'
          />
        </FlexWrapper>
      </CustomSection>
      {width < deviceSize.mobile && <FlexWrapper desktopDirection='column' desktopBasis='48%' desktopGap='48px'>
          <StaticImage src='../../static/images/gdansk/gdansk_contact.jpg' alt='Contact in Gdańsk' />
      </FlexWrapper>}
      <FaqStructuredData faqs={faqs} />
    </Page>
  )
}



export const pageQuery = graphql`
  query($id: String!, $blog_section_tags: [String!]) {
    related: allMdx(
      filter: {frontmatter: {tags: {in: $blog_section_tags}}}
      sort: { frontmatter: {meaningfullyUpdatedAt: DESC } }
      limit: 4
    ) {
      edges {
        node {
          id
          internal {  contentFilePath  }
          excerpt(pruneLength: 500)
          frontmatter {
            excerpt
            comments
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            author
            title
            tags
            date
            meaningfullyUpdatedAt
          }
          fields {
            slug
            timeToRead { minutes }
          }
        }
      }
    }
    service: mdx(id: { eq: $id }) {
      frontmatter {
        team_members
        faqs {
          frontmatter {
            answer {
              html
            }
            question
            slug
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
        highlighted_word
        slug
        bullet_points
        bar_stack
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
        language
        image_our_service_mobile {
          childImageSharp {
            gatsbyImageData(quality: 100, backgroundColor: "white", placeholder: NONE, webpOptions: { quality: 100 })
          }
        }
        image_our_service_desktop {
          childImageSharp {
            gatsbyImageData(quality: 100, backgroundColor: "white", placeholder: NONE, webpOptions: { quality: 100 })
          }
        }
        blog_section
        blog_section_title
      }
    }
  }
`
