import React, { PropsWithChildren } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { Page } from '../layout/Page'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import { CustomSection, CustomSectionTitle, FlexWrapper } from '../components/shared'
import { Container, ArticleContent, ProjectLink, ProjectTextRegular, SectionContact, Title, TopProjectArticle } from './Project.styled'
import AchievementsProject from '../components/shared/AchievementsProject'
import { Projects } from '../components/home/Projects'
import { routeLinks } from '../config/routing'
import { Contact } from '../components/shared/Contact'
import TemporarilyHidden from './TemporarilyHidden'





const Template: React.FC<PropsWithChildren<{ data: { mdx: any } }>> = ({ data, children }) => {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter } = mdx
  const { title,
    description,
    social_media_previev_alt: alt,
    social_media_previev: image,
    bar_achievements,
    hero_image,
    hero_image_alt,
    our_service,
    title_case_study,
    title_contact,
    description_contact,
    show_case_study,
    work_in_progress,
  } = frontmatter
  const heroImage = getImage(hero_image)

  if (work_in_progress) {
    return <TemporarilyHidden />
  }

  return (
    <Page>
      <HelmetMetaData title={title} description={description} type='product' image={image} alt={alt} />
      <Container id='project'>
        <TopProjectArticle >
          <CustomSection paddingProps='0 0 35px' paddingLaptop='0 0 35px' paddingTabletXL='0 0 35px' paddingMobileProps='0 0 35px'>
            <FlexWrapper desktopGap='10px' desktopContent='flex-end' desktopItems='flex-end' tabletDirection='column'>
              {our_service && our_service.map(({ frontmatter: { name, slug } }: { frontmatter: { name: string; slug: string } }, index: number) => (
                <ProjectLink key={index} to={routeLinks.ourAreas({ service: slug })}>
                  {name}
                </ProjectLink>
              ))}
            </FlexWrapper>
          </CustomSection>
          <Title>{title}</Title>
          <ProjectTextRegular >{description}</ProjectTextRegular>
        </TopProjectArticle>

        <ArticleContent >
          <GatsbyImage image={heroImage!} alt={hero_image_alt} />
        </ArticleContent>

      </Container>

      <AchievementsProject achievements={bar_achievements} />

      <Container id='project'>
        <ArticleContent >
          <div className='content'>{children}</div>
        </ArticleContent>

      </Container>
      {show_case_study && <div>
        <CustomSectionTitle mobileMargin='64px 0 30px' >{title_case_study}</CustomSectionTitle>
        <Projects
          isSelectedTag={false}
          currentSlug={mdx.frontmatter.slug}
          isDefaultTitle={false}

        />
      </div>}
      <SectionContact>
        <Contact
          title={title_contact}
          subtitle={description_contact}
          formButton='Business Contact Form Button'
          actionFormButton='Click Submit Business Form'
        />
      </SectionContact>
    </Page>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        description
        hero_image_alt
        social_media_previev_alt
        title_case_study
        title_contact
        description_contact
        show_team
        show_case_study
        social_media_previev {
          childImageSharp {
            gatsbyImageData
          }
        }
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        team_members
        title_team
        bar_achievements {
          label
          number
        }
        our_service {
          frontmatter {
            name
            slug
          }
        }
        work_in_progress
      }
    }
  }
`

export default Template
