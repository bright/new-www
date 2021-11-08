import React from 'react'
import { Contact } from '../components/shared/Contact'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import BackButton from '../components/subcomponents/BackButton'
import { Container } from '../components/whatWeDo/banners/styles'
import { Title } from '../components/whatWeDo/ourDevelopmentAreas/styles'
import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import TeamMembers from './../components/subcomponents/TeamMembers'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Page>
      <HelmetTitleDescription title={frontmatter.title} description={frontmatter.description} />

      <Container className='container'>
        <article className='section'>
          <Title className='title'>{frontmatter.title}</Title>
          {/* grafika */}
          {/* tekst 1 */}
          <BackButton url='/projects' label='Projects' arrowColor={''} className={''} />
          {/* case studies */}
          {/* tekst 2 */}
          <BackButton url='/projects' label='Projects' arrowColor={''} className={''} />
          <TechnologyTags />
          <TeamMembers />
          {/* FAQs */}
          <BackButton url='/projects' label='Projects' arrowColor={''} className={''} />
        </article>
        <Contact />
      </Container>
    </Page>
  )
}
