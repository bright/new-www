import React from 'react'
import { execAll } from '../helpers/execAll'
import { PhotoSlider } from '../photo-slider'

type SliderData = {
  title: string
  description: string
  image: string
}[]

export const sliderConfig = {
  id: 'photo_slider', // Internal id of the component
  label: 'Photo slider', // Visible label
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'slides',
      label: 'Slides',
      widget: 'list',
      fields: [
        {
          name: 'title',
          label: 'Title',
          widget: 'string',
        },
        {
          name: 'text',
          label: 'Text',
          widget: 'markdown',
        },
        {
          name: 'image',
          label: 'Image',
          widget: 'image',
        }
      ],
    },
  ],
  pattern: /^<PhotoSlider>([\S\s]*)<\/PhotoSlider>$/,
  fromBlock: function (match: any[]) {
    const slidesRegex = /<PhotoSlide\s+title="([^"]*)"\s+description="([^"]*)">\[([^\]]*)\]\(([^\s]+)\s"([^"]+)"\)<\/PhotoSlide>/gm
    const slidesString = match[0]
    const slidesData = execAll(slidesRegex, slidesString)

    return {
      slides: slidesData.map((slide) => ({
        title: slide[1],
        description: slide[2],
        image: slide[4],
      }))
    }
  },
  toBlock(data: SliderData) {
    return `<PhotoSlider slides={${JSON.stringify(data)}} />`
  },
  toPreview(data: SliderData) {
    return (
      <PhotoSlider slides={data} />
    ) as unknown as string
  },
}
