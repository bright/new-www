import React from 'react'
import { PhotoSlider } from '../photo-slider'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export type SlideData = {
  title: string
  description: string
  image: string
}

export const sliderConfig = {
  id: 'photo_slider',
  label: 'Photo slider',
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
          name: 'description',
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
  toBlock(data: { slides: SlideData[] }) {
    return `<PhotoSlider slides={${JSON.stringify(data.slides)}} />`
  },
  toPreview(data: { slides: SlideData[] }, getAsset: PreviewTemplateComponentProps['getAsset']) {
    const slides = data.slides.map((slide) => {
      const image  = getAsset(slide.image);

      return {
        ...slide,
        image: image.toString(),
      }
    })

    return (
      <PhotoSlider slides={slides} />
    )
  },
}
