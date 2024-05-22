import React from 'react'
import { PhotoSlider } from '../photo-slider'

export type SlideData = {
  title: string
  description: string
  image: string
}

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
  pattern: /^<PhotoSlider slides="(.*?)" \/>$/,
  fromBlock: function (match: any[]) {
    return JSON.parse(match[1])
  },
  toBlock(data: SlideData[]) {
    return `<PhotoSlider slides="${JSON.stringify(data)}" />`
  },
  toPreview(data: SlideData[]) {
    return (
      <PhotoSlider slides={data} />
    ) as unknown as string
  },
}
