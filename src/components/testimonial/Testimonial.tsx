import {
  Author,
  AuthorWrapper,
  Dash,
  LinkWrapper,
  Name,
  Photo,
  PositionAndCompany,
  Quote,
  QuoteWrapper,
  Wrapper,
} from './Testimonial.styled'
import React from 'react'
import { Link } from 'gatsby'

interface TestimonialProps {
  quote: string
  author: string
  photo?: JSX.Element
  position: string
  company: string
  link: string
}

export const Testimonial = ({ quote, author, photo, position, company, link }: TestimonialProps) => {
  return (
    <Wrapper>
      <AuthorWrapper>
        {photo && <Photo>{photo}</Photo>}
        <Author>
          <Name>{author}</Name>

          <PositionAndCompany>
            {position} / {company}
          </PositionAndCompany>
        </Author>
      </AuthorWrapper>

      <QuoteWrapper>
        <Quote>{quote}</Quote>
        <Dash>—</Dash>
        <LinkWrapper>
          <Link to={link} target='_blank'>
            see on Clutch
          </Link>
        </LinkWrapper>
      </QuoteWrapper>
    </Wrapper>
  )
}
