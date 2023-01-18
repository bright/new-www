import React from 'react'
import { MoreButton } from '../../shared'
import { Container, ContentWrapper, Text, OurAreasButtonWrapper } from './styles'

const WorkshopsBanner = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text>we organise Agile workshops for teams</Text>
        <OurAreasButtonWrapper>
          <MoreButton href='/our-areas/agile-workshops' className='our-areas-button'>
            book free consultation
          </MoreButton>
        </OurAreasButtonWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default WorkshopsBanner
