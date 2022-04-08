import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Button, Section, SectionTitle } from '../shared'
import { routeLinks } from '../../config/routing'

const SectionDescription = styled.div`
  margin-bottom: 4em;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export interface ProductIdeaProps {}

const ProductIdea: FC<ProductIdeaProps> = props => {
  return (
    <Section className='has-background-primary has-text-centered '>
      <SectionTitle className='is-size-3'>let’s talk about your product idea</SectionTitle>
      <SectionDescription className='column is-8 is-offset-2 mb-6 has-text-centered'>
        Have an idea for a groundbreaking software project, but don’t know where to start? Or maybe you’re looking for
        software development experts to help take your product to the next level? We’ll be more than happy to discuss
        how we can help your business succeed! Fill the form below, or drop us a line via{' '}
        <a href='mailto:info@brightinventions.pl?subject=bright%20mail'>info@brightinventions.pl</a>
      </SectionDescription>
      <Link to={routeLinks.startProject}>
        <Button className='has-background-primary hover-white'>request a consulatation</Button>
      </Link>
    </Section>
  )
}

export default ProductIdea
