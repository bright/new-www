import {graphql} from 'gatsby'
import React from 'react'
import styled from "styled-components"

import {Page} from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import DateFormatter from '../components/subcomponents/Date'
import DisqusComments from '../components/subcomponents/DisqusComments'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import {getFileNameOnly} from '../helpers/pathHelpers'

const Container = styled.div`
    max-width: 960px;
`

export default function Template(props: {
    path: string
    data: {
        markdownRemark: {
            html: string
            excerpt: string
            frontmatter: {
                slug: string
                title: string
                description: string
                author: string
                tags: string[]
                date: string
                excerpt: string
                image: string
            }
            timeToRead: number
            fileAbsolutePath: string
        }
        allMarkdownRemark: {
            nodes: Array<{
                frontmatter: {
                    author_id: string
                    avatar: string
                    bio: string
                    name: string
                    web: string
                }
            }>
        }
        site: {
            siteMetadata: {
                siteUrl: string
            }
        }
    }
}) {
    const {markdownRemark, allMarkdownRemark} = props.data // data.markdownRemark holds your post data
    const {frontmatter: page, html} = markdownRemark

    const author = allMarkdownRemark.nodes.find(({frontmatter: userData}) => {
        return userData.author_id === page.author
    })!.frontmatter

    return (
        <Page>
            <HelmetWrapper title={page.title} description={markdownRemark.excerpt}>
                <meta property="og:title" content={markdownRemark.frontmatter.title} />
                <meta property="og:description" content={markdownRemark.excerpt} />
                <meta property="og:url" content={props.data.site.siteMetadata.siteUrl + props.path} />
                <meta property="og:site_name" content="Bright Inventions" />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={markdownRemark.frontmatter.date} />
                <meta property="article:author" content={markdownRemark.frontmatter.author} />
                <meta property="og:image" content={props.data.site.siteMetadata.siteUrl + markdownRemark.frontmatter.image} />
            </HelmetWrapper>

            <Container className="container">
                <article className="section">
                    <div className="columns is-vcentered">
                        <div className="column is-half">
                            <AuthorData {...author} />
                        </div>
                        <div className="column has-text-right">
                            <div className="content has-text-grey-light">
                                <p className="has-text-primary">
                                    {markdownRemark.timeToRead} min
                                </p>
                                <p className="tags has-justify-content-flex-end">
                                    {page.tags.map((tag, index) => (
                                        <span className="tag" key={'tag-' + index}>
                      {tag}
                    </span>
                                    ))}
                                </p>

                                <p>
                                    {page.date && (
                                        <DateFormatter date={page.date}/>
                                    )}
                                    &nbsp;
                                    <a
                                        className='has-text-grey-light'
                                        href={
                                            '/admin/#/collections/blog/entries/' +
                                            getFileNameOnly(markdownRemark.fileAbsolutePath)
                                        }
                                    >
                                        Edit
                                    </a>
                                </p>
                                {/* <p>{% include post/date.html date=page.date updated=page.updated %}</p>  */}
                            </div>
                        </div>
                    </div>

                    <h1 className='title'>{page.title}</h1>
                    <div
                        className='content is-family-secondary'
                        dangerouslySetInnerHTML={{__html: html}}
                    />

                    {/* {% include _back_button.html url='/blog' label='Blog' %} */}
                    <BackButton url='/blog' label='Blog'/>

                    {/* {% include post/crosspost.html %} */}

                    {/* {% if site.owner.disqus-shortname and page.comments == true %} */}
                    {/* <section id='disqus_thread'></section><!-- /#disqus_thread --> */}
                    {/* {% endif %} */}
                    <DisqusComments title={page.title}/>
                </article>
            </Container>
    </Page>
  )
}

interface AuthorDataProps {
    author_id?: string
    avatar?: string
    name?: string
    bio?: string
}
const AuthorData: React.FC<AuthorDataProps> = ({author_id, avatar, name, bio}) => {
    const LinkComponent = author_id ? 'a' : 'span'

    return (
        <LinkComponent {...(author_id ? {...{href: '/about-us/' + author_id}} : {})}>
            <article className="media">
                {avatar && (
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img
                                src={avatar}
                                alt={name + ' bio photo'}
                                className="is-rounded"
                            />
                        </p>
                    </figure>
                )}
                <div className="media-content">
                    <div className="content">
                        <h4 className="title has-text-dark">{name}</h4>
                        <p className="subtitle is-6">{bio}</p>
                    </div>
                </div>
            </article>
        </LinkComponent>
    )
}

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      excerpt
      frontmatter {
        slug
        title
        description
        author
        tags
        date
        image
      }
      timeToRead
      fileAbsolutePath
    }
    allMarkdownRemark(filter: { frontmatter: { author_id: { ne: null } } }) {
      nodes {
        frontmatter {
          author_id
          avatar
          bio
          name
          web
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
