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
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { TestimonialModel } from '../../models/gql'

interface TestimonialProps {
  testimonial: TestimonialModel
}

export const Testimonial = ({ testimonial: {
  testimonials_quote,
  testimonials_author,
  testimonials_photo,
  testimonials_position,
  testimonials_company,
  testimonials_link,
}}: TestimonialProps) => {
  const photo = getImage(testimonials_photo)

  return (
    <Wrapper>
      <AuthorWrapper>
        {photo && (
          <Photo>
            <GatsbyImage image={photo} alt={testimonials_author} />
          </Photo>
        )}
        <Author>
          <Name>{testimonials_author}</Name>

          <PositionAndCompany>
            {testimonials_position} / {testimonials_company}
          </PositionAndCompany>
        </Author>
      </AuthorWrapper>

      <QuoteWrapper>
        <Quote>{testimonials_quote}</Quote>
        <Dash>—</Dash>
        <LinkWrapper>
          <Link to={testimonials_link} target='_blank'>
            see on Clutch
          </Link>
        </LinkWrapper>
      </QuoteWrapper>
    </Wrapper>
  )
}
