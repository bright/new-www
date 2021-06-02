import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Section, SectionTitle } from '../../components/shared'
import variables from '../../styles/variables'

import imgFacebook from './../../../static/images/social/facebook.svg'
import imgLinkedIn from './../../../static/images/social/linkedIn.svg'
import imgPinterest from './../../../static/images/social/pinterest.svg'

const Block = styled.div`
  position: relative;
  display: inline-block;
  width: calc(50% - 2rem);
  min-height: 10rem;
  margin: 1rem 1rem;
  font-size: 0;
  
  p {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 1rem;
    font-weight: 800;
    color: ${variables.color.white};
    height: 10rem;
    background: transparent linear-gradient(180deg, rgba(19,18,20,0) 0%, rgba(19,18,20,1) 100%) 0 0 no-repeat padding-box;
    transition: background-position ease-in 0.2s;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    
    &:hover {
      background-position: 0 1rem;
    }
  }
  
  @media ${variables.device.mobile} {
    width: calc(100% - 2rem);
  }
`

const BlockSmall = styled(Block)`
  border: 1px solid ${variables.color.border};
  height: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  font-size: 1rem;
  
  span {
    flex-grow: 1;
  }
  
  img {
    width: 2rem;
  }
  
  .more {
    display: flex;
    flex-grow: 1;
    margin: -2rem;
    height: calc(100% + 4rem);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
`

const Benefits: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const blocks = useMemo(() => ([
    {image: '/images/career/benefits/image1.png', title: 'Running & cycling workouts with pro triathlete', alt: 'Running and cycling workouts'},
    {image: '/images/career/benefits/image2.png', title: 'Swimming workouts with pro triathlete', alt: 'Swimming workouts'},
    {image: '/images/career/benefits/image3.png', title: 'Friday yoga', alt: 'Friday yoga'},
    {image: '/images/career/benefits/image4.png', title: 'Bright lunches & donuts', alt: 'Lunches and donuts'},
    {image: '/images/career/benefits/image5.png', title: 'English classes', alt: 'English classes'},
    {image: '/images/career/benefits/image6.png', title: 'Great library', alt: 'Library'},
    ...(expanded ? [
      {image: '/images/career/benefits/image7.png', title: 'Team retreats', alt: 'Team retreats'},
      {image: '/images/career/benefits/image8.png', title: 'Internal workshops', alt: 'Internal workshops'},
      {image: '/images/career/benefits/image9.png', title: 'Mentoring', alt: 'Mentoring'},
      {image: '/images/career/benefits/image10.png', title: 'Board game fridays', alt: 'Board game fridays'},
    ] : [])
  ]), [expanded])

  return (
    <div className='container'>
      <Section className='is-clearfix'>
        <SectionTitle>our life is also <span className='has-text-primary'>bright</span></SectionTitle>

        <BlockSmall className='is-pulled-right'>
          <span>Follow us on:</span>
          <a target='_blank' href={'https://www.linkedin.com/company/bright-inventions/'}><img src={imgLinkedIn} alt={'LinkedIn'} /></a>
          <a target='_blank' href={'https://www.facebook.com/bright.inventions/'}><img src={imgFacebook} alt={'Facebook'} /></a>
          <a target='_blank' href={'https://www.instagram.com/bright_inventions/'}><img src={imgPinterest} alt={'Pinterest'} /></a>
        </BlockSmall>
        {blocks.map((block, index) => (
          <Block key={block.title} className={`is-pulled-${index % 2 ? 'right' : 'left'}`}>
            <figure className='image is-inline-block'>
              <img src={block.image} alt={block.alt} />
            </figure>
            <p>{block.title}</p>
          </Block>
        ))}
        <BlockSmall className='is-pulled-left'>
          <span onClick={() => setExpanded(!expanded)} className='more'>see {expanded ? 'less' : 'more'}</span>
        </BlockSmall>
      </Section>
    </div>
  )
}

export default Benefits
