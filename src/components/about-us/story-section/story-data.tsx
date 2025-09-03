import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

interface Story {
  images: readonly React.ReactNode[]
  logos: readonly React.ReactNode[]
  avatars: readonly React.ReactNode[]
  heading: string
  subheading: string
  content: string
}

export const story: readonly Story[] = [
  {
    images: [],
    logos: [],
    avatars: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/michal_history.png'
        alt='Michał Łukasiewicz'
      />,
      <StaticImage
        src='../../../../static/images/why-us/timeline/daniel_history.png'
        alt='Daniel Makurat'
      />
    ],
    heading: '2005-2011',
    subheading: '',
    content: `Michał and Daniel, the founders of Bright Inventions, met while studying Computer Science at Gdansk University of Technology. Then, while working in one of the global IT companies they decided to set up their own business and create a place where people would really enjoy working in.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/bright-inventions.png'
        objectFit={'contain'}
        alt='bright inventions logo'
      />
    ],
    heading: '2012',
    subheading: '',
    content: `Bright Inventions is born!`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/practi.png'
        objectFit={'contain'}
        alt='practi logo'
      />
    ],
    heading: '2013',
    subheading: '',
    content: `The beginning of cooperation with one of our main business partners, Practi by JustEat.`
  },
  {
    avatars: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/piotr-mionskowski.png'
        alt='Piotr Mionskowski'
      />,
      <StaticImage
        src='../../../../static/images/why-us/timeline/mateusz-klimczak.png'
        alt='Mateusz Klimczak'
      />
    ],
    logos: [],
    images: [],
    heading: '2014',
    subheading: '',
    content: `First team members appear. Piotr, Adam and Mateusz joined the team. Piotr and Mateusz are playing the main roles in day-to-day company life till these days.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/smarthelp_logo2015.png'
        alt='Smart Help logo'
      />
    ],
    heading: '2015',
    subheading: '',
    content: `We started working on SmartHelp project, an emergency service app that allows users to easily call for help and provide relevant authorities with personal details.`
  },
  {
    images: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/office.jpg'
        alt='A new office'
      />
    ],
    logos: [],
    avatars: [],
    heading: '2016',
    subheading: '',
    content: `Time to spread our wings! We moved out of the Business Incubator into a bigger office to fit our growing team.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/blockchain.png'
        alt='Blockchain logo'
      />
    ],
    heading: '2017',
    subheading: '',
    content: `We stepped onto the international stage, combining blockchain expertise with partnerships that reached far beyond Poland.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/clutch.png'
        alt='Clutch logo'
      />
    ],
    heading: '2018',
    subheading: '',
    content: `Bright Inventions among TOP App Development and B2B agencies in Poland according to Clutch’s reviews.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/5c597db37cfe14a8e24f4a0f_bright_inventions_logo_500-01.png'
        alt='Logo from 2001'
        objectFit={'contain'}
      />
    ],
    heading: '2019',
    subheading: '',
    content: `New services launched to support our clients in product design. We now have 30 Bright People on board.`
  },
  {
    avatars: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/Magda2020.png'
        alt='Magda'
      />,
      <StaticImage
        src='../../../../static/images/why-us/timeline/Maciej2020.png'
        alt='Maciej'
      />,
      <StaticImage
        src='../../../../static/images/why-us/timeline/bartek2020.png'
        alt='Bartek'
      />
    ],
    images: [],
    logos: [],
    heading: '2020',
    subheading: '',
    content: `The team is growing. There are 58 Bright People on board.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/bright-treasury.png'
        alt='Bright Treasury'
      />
    ],
    heading: '2021',
    subheading: '',
    content: `We launched a beta version of Bright Treasury – our original app dedicated to Substrate Blockchain networks.`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/birthday_2022.png'
        alt='Bright Inventions 10th birthday'
      />
    ],
    heading: '2022',
    subheading: '',
    content: `We celebrated 10th birthday! Also, we joined the Nordic Group Lyvia (prev. Mirovia).`
  },
  {
    images: [],
    avatars: [],
    logos: [
      <StaticImage
        src='../../../../static/images/why-us/timeline/framna.svg'
        alt='Framna'
        objectFit={'contain'}
      />
    ],
    heading: '2025',
    subheading: '',
    content: `We joined Framna the digital product agency which will become the world's leading digital product agency.`
  }
] as const
