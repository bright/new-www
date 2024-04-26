import React, { CSSProperties, useRef, useEffect, PropsWithChildren } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { PageContext, Paging } from '../blog/Paging'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HideDesktop, HideTablet } from '../components/shared'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Edge } from '../models/gql'
import { BlogFeed } from '../blog/Feed'
import { createBlogPosts } from '../models/creator'
import {
  CustomContainer,
  CustomSection,
  CustomSectionTitle,
  PageTitle,
  SectionInner,
} from '../components/shared/index.styled'

import variables from '../styles/variables'
import { SEO } from '../meta/SEO'

const gatsbyStyle: CSSProperties = {
  display: 'block !important',
  margin: '0 auto',
  width: '70%',
  maxWidth: '428px',
}
const AuthorSection = styled(CustomSection)`
  padding-top: 1rem;
`
const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .content {
    padding-bottom: 2rem;
    color: #0a0a0a;
    font-size: ${variables.font.customtext.size};
    line-height: 2.5rem;
  }
`

const ImageWrapper = styled.figure`
  width: 100%;
  max-width: 428px;
  max-height: 100%;
  @media ${variables.device.laptop} {
    & .is-rounded {
      & img {
        max-height: 500px;
      }
    }
  }
`
const AuthorPageTitle = styled(PageTitle)`
  margin-bottom: 0.75rem;
  margin-top: 3.375rem;
  color: #0a0a0a;
`
const Subtitle = styled.div`
  margin-bottom: 5rem;
  text-align: center;
  font-family: ${variables.font.customtext.lato};
  font-size: ${variables.font.customtext.sizeAuthor};
  font-weight: 700;
  color: #0a0a0a;
`
const AuthorBackButton = styled(BackButton)`
  display: block;
  margin: 0 auto;
  margin-top: 9.5625rem;
  margin-bottom: 7.625rem;
  display: flex;
  align-items: center;
  font-weight: 900;
  color: #000;

  & > span {
    margin-left: 1.125rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
  }

  @media ${variables.device.mobile} {
    margin-top: ${variables.pxToRem(60)};
    margin-bottom: ${variables.pxToRem(60)};
  }
`
const AuthorBackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  data: Queries.AuthorsPageQuery
  pageContext: PageContext & { posts: Edge[]; id: string } // TODO: add use proper blog post type
}

export const Head = ({ data }: Props) => <SEO
  title={`Meet ${data.members?.short_name}`}
  description={data.members?.bio}
/>

const AboutUSTemplate: React.FC<PropsWithChildren<Props>> = ({ data, pageContext, children }) => {
  const { members: member } = data // data.mdx holds your post data
  if (!member) {
    throw new Error(`data.member required but not found for id: ${pageContext.id}`)
  }
  const avatarImage = getImage((member.avatar_hover ?? member.avatar)!.childImageSharp)!
  const postsRef = useRef<HTMLHeadingElement>(null)

  const { posts } = pageContext
  const { currentPage: page } = pageContext
  const { slug } = member
  const authorId = slug

  useEffect(() => {
    const { current } = postsRef

    if (current !== null && page > 1) {
      const yOffset = -200
      const y = current.getBoundingClientRect().top + window.pageYOffset + yOffset

      setTimeout(() => {
        window.scrollTo({
          top: y,
        })
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <Page>
      <AuthorSection>
        <CustomContainer>
          <AuthorWrapper>
            <HideTablet>
              <ImageWrapper>
                <GatsbyImage className='is-rounded' image={avatarImage} alt={member.name} />
              </ImageWrapper>
            </HideTablet>
            <HideDesktop>
              <figure className='level-left' style={gatsbyStyle}>
                <GatsbyImage imgClassName='is-rounded' image={avatarImage} alt={member.name} />
              </figure>
            </HideDesktop>
            <SectionInner>
              <AuthorPageTitle>{member.short_name}</AuthorPageTitle>
              <Subtitle>{member.bio}</Subtitle>
              <div className='content'>{children}</div>
            </SectionInner>
          </AuthorWrapper>
          {posts?.length > 0 && (
            <>
              <CustomSectionTitle ref={postsRef}>blog posts by {member.short_name}</CustomSectionTitle>
              <BlogFeed posts={createBlogPosts(posts)} />

              <Paging pageContext={pageContext} baseURI={routeLinks.aboutUs({ authorId, slug })} />
            </>
          )}
          <AuthorBackButtonWrapper>
            <AuthorBackButton url={routeLinks.aboutUs({ page: 'team' })} label='back to team' arrowColor={'orange'} />
          </AuthorBackButtonWrapper>
        </CustomContainer>
      </AuthorSection>
      {/*

<script type="application/ld+json">
    {% assign same_as = "" | split: ', ' %}
    {% if page.twitter %}
    {% capture url %}"https://twitter.com/{{ page.twitter }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {% if page.github %}
    {% capture url %}"https://github.com/{{ page.github }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {% if page.stackoverflow %}
    {% capture url %}"https://stackoverflow.com/users/{{ page.stackoverflow }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": "{{ page.name }}",
        "url": "{{ page.web }}",
        "image": "{{ page.avatar | absolute_url }}",
        "jobTitle": "{{ page.bio }}",
        "sameAs": [
            {{ same_as | join: ',' }}
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Bright Inventions"
        }
    }
</script> */}
    </Page>
  )
}
export const pageQuery = graphql`
  query AuthorsPage($id: String!) {
    members(id: { eq: $id }) {
      short_name
      avatar {
        childImageSharp {
          gatsbyImageData
        }
      }
      avatar_hover {
        childImageSharp {
          gatsbyImageData
        }
      }
      slug
      title
      description
      bio
      name
    }
  }
`
export default AboutUSTemplate
