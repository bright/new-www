import React, { FC } from "react"
import styled from "styled-components"

import { Section, SectionTitle } from '../shared'

const ClutchContainer = styled.div`
  padding: 3rem 0rem;
  display: flex;
  justify-content: center;
`

const ClutchItem = styled.div`
  height: 150px;

  @media (max-width: 768px) {
    height: 100px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export interface ClutchInfoProps {}

const ClutchInfo: FC<ClutchInfoProps> = props => {
  return (
    <Section>
      <ClutchItem>
        <img src="/images/clutch/Poland_B2B_Companies_2019.png" />
      </ClutchItem>
      <ClutchItem>
        <img src="/images/clutch/App-Developers-for-Startups-2019.png" />
      </ClutchItem>
      <ClutchItem>
        <img src="/images/clutch/Developers_Poland_2018.png" />
      </ClutchItem>
      <ClutchItem className="is-hidden-mobile">
        <img src="/images/clutch/Web_Developers_Poland_2018.png" />
      </ClutchItem>
      <ClutchItem className="is-hidden-mobile">
        <img src="/images/clutch/appfutura-badge.png" />
      </ClutchItem>
    </Section>
  )
}

export default ClutchInfo
