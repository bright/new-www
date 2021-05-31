import React from 'react'

import { Section } from '../../components/shared'
import { StaticImage } from 'gatsby-plugin-image'
import { ImagesHorizontal, ImagesVertical } from './images.styled'

const Images: React.FC = () => {
  return (
    <Section>
        <ImagesHorizontal>
          <StaticImage src="../../../static/images/career/image1.png" alt={'Career at Bright Inventions'} />
          <ImagesVertical>
            <StaticImage src="../../../static/images/career/image2.png" alt={'Software developer career Poland'} />
            <StaticImage src="../../../static/images/career/image3.png" alt={'Software developer career Poland'} />
          </ImagesVertical>
          <StaticImage src="../../../static/images/career/image4.png" alt={'Career at Bright Inventions'} />
        </ImagesHorizontal>
    </Section>
  )
}

export default Images
