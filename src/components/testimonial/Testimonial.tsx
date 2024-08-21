import {
  Author,
  AuthorWrapper,
  Name,
  Photo,
  PositionAndCompany,
  QuoteWrapper,
  Wrapper,
} from './Testimonial.styled'
import React from 'react'
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

      <QuoteWrapper dangerouslySetInnerHTML={{ __html: testimonials_quote?.html }} />
    </Wrapper>
  )
}
