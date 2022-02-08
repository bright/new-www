import React from 'react'
import styled from 'styled-components'

import AboutUsPage from '../about-us'
import { TextTitle, TextRegular } from '../../components/shared'

import ResponsibilityIcon from '../../assets/responsibility.svg'
import FlexibilityIcon from '../../assets/flexibility.svg'
import TeamworkIcon from '../../assets/teamwork.svg'
import PositiveAttitudeIcon from '../../assets/positive_Attitude.svg'
import ClientOrientationIcon from '../../assets/client-orientation.svg'

const Container = styled.div`
  max-width: 960px;
  margin: auto auto 5rem;
  font-size: 1.375rem;
  line-height: 2.5rem;
`

const Value = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 6.25rem;
  && figure {
    width: 150px;
    margin: 0 0 1.25rem;
  }
`

export default function ValuesPage() {
  return (
    <AboutUsPage>
      <Container>
        <TextRegular>
          We believe that bright ideas and bright products come out of bright minds. The success of projects we do is
          completely sustained by our team and values we are committed to. We work together making the most of
          experience and expertise we have.
        </TextRegular>

        <Value>
          <figure>
            <ResponsibilityIcon />
          </figure>
          <TextTitle>Responsibility</TextTitle>
          <TextRegular>
            We support and share responsibility with the members of our team. We also actively take responsibility for
            our own self-development. Integrity, thoughtfulness and a sense of urgency is a crucial and elemental part
            of our success. Everything is everyone’s responsibility and we own our collective results together.
          </TextRegular>
        </Value>
        <Value>
          <figure>
            <FlexibilityIcon />
          </figure>
          <TextTitle>Flexibility</TextTitle>
          <TextRegular>
            We balance ambition with flexibility because what matters is the final result. We are nimble. We evolve and
            adapt. People who work here are not afraid of taking risk and making mistakes as long as we learn from them.
            We encourage the diversity of thought.
          </TextRegular>
        </Value>

        <Value>
          <figure>
            <TeamworkIcon />
          </figure>
          <TextTitle>Teamwork</TextTitle>
          <TextRegular>
            It is only through teamwork that we achieve brightness. We are committed to helping our customers by working
            together with equal parts of humility and ambition. We know each others' strengths and we also can ask for
            help when we need. We work together to bring our passions and expertise to make Bright Inventions the best
            place it can be.
          </TextRegular>
        </Value>

        <Value>
          <figure>
            <PositiveAttitudeIcon />
          </figure>
          <TextTitle>Positive attitude</TextTitle>
          <TextRegular>
            We love what we do and the people around us. In fact, we believe that happy people are more motivated,
            efficient and creative, so we bring a positive attitude to everything we do. It's good for you, for the
            team, and for our customers.
          </TextRegular>
        </Value>

        <Value>
          <figure>
            <ClientOrientationIcon />
          </figure>
          <TextTitle>Client orientation</TextTitle>
          <TextRegular>
            We are only successful if our clients are - and that drives everything we do. Clients trust us to build
            things that work and we take that seriously. Our team will overcome obstacles, find solutions and deliver
            results on time. Every action we take enables our clients to make a bigger impact on the world.
          </TextRegular>
        </Value>
      </Container>
    </AboutUsPage>
  )
}
