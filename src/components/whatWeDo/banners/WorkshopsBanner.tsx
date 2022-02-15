import React from 'react'
import { BannerLink, Button, Container, ContentWrapper, Text } from './styles'

const WorkshopsBanner = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text>we organise Agile workshops for teams</Text>

        <BannerLink to='/our-areas/agile-workshops'>
          <Button>book free consultation</Button>
        </BannerLink>
      </ContentWrapper>
    </Container>
  )
}

export default WorkshopsBanner
