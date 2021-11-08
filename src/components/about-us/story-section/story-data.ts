const position = ["Left", "Right"] as const
interface Story {
  position: typeof position[number]
  images: readonly { src: string; alt: string }[]
  logos: readonly { src: string; alt: string }[]
  heading: string
  subheading: string
  content: string
}
export const story: readonly Story[] = [
  {
    position: "Right",
    images: [
      {
        src: "/images/members/michał_łukasiewicz.jpg",
        alt: "Michał Łukasiewicz",
      },
      {
        src: "/images/members/daniel_makurat.jpg",
        alt: "Daniel Makurat",
      },
    ],
    logos: [],
    heading: "2005-2010",
    subheading: "",
    content: `Michał and Daniel, the founders of Bright Inventions, are studying Computer Science at Gdansk University of Technology.`,
  },
  {
    position: "Left",
    images: [],
    logos: [],
    heading: "2009-2011",
    subheading: "",
    content: `While working in one of the global IT companies they started to think about setting up their own business and creating the place where people would really enjoy working in.`,
  },
  {
    position: "Right",
    images: [],
    logos: [
      {
        src: "/images/why-us/timeline/bright-inventions.png",
        alt: "bright inventions logo",
      },
    ],
    heading: "2012",
    subheading: "",
    content: `Bright Inventions is born!`,
  },
  {
    position: "Left",
    images: [],
    logos: [
      {
        src: "/images/why-us/timeline/practi.png",
        alt: "practi logo",
      },
    ],
    heading: "2013",
    subheading: "",
    content: `The beginning of cooperation with one of our main business partners, Practi by JustEat.`,
  },
  {
    position: "Right",
    images: [
      {
        src: "/images/piotr_m2_team.png",
        alt: "Piotr Mionskowski",
      },
      {
        src: "/images/members/mateusz_klimczak.jpg",
        alt: "Mateusz Klimczak",
      },
    ],
    logos: [],
    heading: "2014",
    subheading: "",
    content: `First team members appear. Piotr, Adam and Mateusz joined the team. Piotr and Mateusz are playing the main roles in day-to-day company life till these days.`,
  },
  {
    position: "Left",
    images: [],
    logos: [],
    heading: "2015",
    subheading: "",
    content: `We started working on SmartHelp project, an emergency service app that allows users to easily call for help and provide relevant authorities with personal details.`,
  },
  {
    position: "Right",
    images: [],
    logos: [
      {
        src: "/images/why-us/timeline/bds.png",
        alt: "Baltic Data Science logo",
      },
    ],
    heading: "2016",
    subheading: "",
    content: `Baltic Data Science is founded by Bright Inventions & Datarella, a data science and blockchain consulting company specializing in business-focused solutions. We are entering the cryptocurrency world. New services available. Development of the first Blockchain features.`,
  },
  {
    position: "Left",
    images: [],
    logos: [
      {
        src: "/images/why-us/timeline/united-nations.png",
        alt: "United Nations logo",
      },
    ],
    heading: "2017",
    subheading: "",
    content: `The rise of our successful cooperation with the United Nations organisation.`,
  },
  {
    position: "Right",
    images: [],
    logos: [
      {
        src: "/images/why-us/timeline/clutch.png",
        alt: "Clutch logo",
      },
    ],
    heading: "2018",
    subheading: "",
    content: `Bright Inventions among TOP App Development and B2B agencies in Poland according to Clutch’s reviews.`,
  },
  {
    position: "Left",
    images: [],
    logos: [
      {
        src:
          "/images/5c597db37cfe14a8e24f4a0f_bright_inventions_logo_500-01.png",
        alt: "Logo from 2001",
      },
    ],
    heading: "2019",
    subheading: "",
    content: `New services launched to support our clients in product design. We now have 30 Bright People on board.`,
  },
  {
    position: "Right",
    images: [],
    logos: [],
    heading: "2020",
    subheading: "",
    content: `The team is growing. There are 58 Bright People on board.`,
  },
  {
    position: "Left",
    images: [],
    logos: [
      {
        src:
          "/images/bright-treasury.png",
        alt: "Bright Treasury",
      },
    ],
    heading: "2021",
    subheading: "",
    content: `We started to work on Bright Treasury – our original app dedicated to Substrate Blockchain networks.`,
     },
] as const
