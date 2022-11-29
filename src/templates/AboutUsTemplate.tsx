import React, { CSSProperties, useRef, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { PageContext, Paging } from './blog/Paging'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import { HideDesktop, HideTablet, MoreButton } from '../components/shared'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { GQLData } from '../models/gql'
import { BlogFeed } from './blog/Feed'
import { createBlogPosts } from '../models/creator'
import {
  CustomContainer,
  CustomSection,
  CustomSectionTitle,
  PageTitle,
  SectionInner,
} from '../components/shared/index.styled'
import variables from '../styles/variables'

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
  data: GQLData
  pageContext: PageContext
}
const AboutUSTemplate: React.FC<Props> = ({
  data,
  pageContext,
  children,
}: // this prop will be injected by the GraphQL query below.
any) => {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter } = mdx
  const avatarImage = getImage(frontmatter.avatar_hover)!
  const postsRef = useRef<HTMLHeadingElement>(null)

  const { posts } = pageContext
  const { currentPage: page } = pageContext
  const { slug } = frontmatter
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
      <HelmetMetaData title={`Meet ${frontmatter.short_name}`} description={frontmatter.bio} />
      <AuthorSection>
        <CustomContainer>
          <AuthorWrapper>
            <HideTablet>
              <ImageWrapper>
                <GatsbyImage className='is-rounded' image={avatarImage} alt={frontmatter.name} />
              </ImageWrapper>
            </HideTablet>
            <HideDesktop>
              <figure className='level-left' style={gatsbyStyle}>
                <GatsbyImage imgClassName='is-rounded' image={avatarImage} alt={frontmatter.name} />
              </figure>
            </HideDesktop>
            <SectionInner>
              <AuthorPageTitle>{frontmatter.short_name}</AuthorPageTitle>
              <Subtitle>{frontmatter.bio}</Subtitle>
              <div className='content'>{children}</div>
            </SectionInner>
          </AuthorWrapper>
          {posts?.length > 0 && (
            <>
              <CustomSectionTitle ref={postsRef}>blog posts by {frontmatter.short_name}</CustomSectionTitle>
              <BlogFeed posts={createBlogPosts(posts)} />

              <Paging pageContext={pageContext} baseURI={`${routeLinks.aboutUs({ authorId, slug })}`} />
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
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
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
  }
`
export default AboutUSTemplate
