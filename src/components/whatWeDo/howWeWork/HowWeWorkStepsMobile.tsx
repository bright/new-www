import React from 'react'
import styled from 'styled-components'
import { TextTitle } from '../../shared'
import variables from '../../../styles/variables'

const Container = styled.div({
  marginTop: '99px',
  width: '100%',
  height: '318px',
  background: '#F7931E 0% 0% no-repeat padding-box',

  display: 'flex',
  flexDirection: 'column',

  justifyContent: 'center',
  alignItems: 'center',
})

const ProcessImage = styled.img({
  marginTop: '29px',
  paddingLeft: '18px',
  paddingRight: '18px',
})

const Header = styled(TextTitle)({
  textAlign: 'center',

  color: variables.color.text,
})

const HowWeWorkStepsMobile = () => {
  return (
    <Container>
      <Header>the process</Header>
      <ProcessImage src='/images/WhatWeDoArrowsMobile.png' />
    </Container>
  )
}

export default HowWeWorkStepsMobile
