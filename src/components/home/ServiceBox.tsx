import React from "react"
import styled from "styled-components"

const Container = styled.div`
  margin-top: 1em;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const ServiceBoxIcon = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    svg {
      width: 80px;
    }
  }
`

const ServiceBoxTitle = styled.div`
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0px;
  color: #000000;
  margin: 0 0 1em;
`

const ServiceBoxDescription = styled.div`
  text-align: left;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  text-align: justify;
  letter-spacing: 0px;
  color: #000000;
  opacity: 0.75;
`

const ServiceBox: React.FC<{
  title: string
  description: string
  icon: JSX.Element
}> = ({ icon, title, description }) => {
  return (
    <Container>
      <ServiceBoxIcon>{icon}</ServiceBoxIcon>
      <ServiceBoxTitle>{title}</ServiceBoxTitle>
      <ServiceBoxDescription>{description}</ServiceBoxDescription>
    </Container>
  )
}

export default ServiceBox
