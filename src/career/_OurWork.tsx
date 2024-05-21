import React from 'react'
import styled from 'styled-components'
import { CustomSection, CustomSectionTitle } from '../components/shared'
import { CarouselQuotesSwiper } from '../components/shared/CarouselQuotesSwiper'
import variables from '../styles/variables'
import { StaticImage } from 'gatsby-plugin-image'

const SectionEx = styled(CustomSection)`
  @media ${variables.device.laptop} {
    padding: 0 6rem 0;
  }
  @media ${variables.device.tabletXL} {
    padding: 0 5.875rem 0;
  }
  @media ${variables.device.tablet} {
    padding: 0 1.1875rem 0;
  }
`

const OurWork: React.FC = () => {
  const quotes = [
    {
      avatar_hover: (
        <StaticImage src='../../static/images/tomek2_passion.png' alt='Tomasz' className='quote-img' />
      ),
      short_name: 'Tomasz',
      bio: 'Backend Developer',
      slug: 'tomasz-sch',
      quote:
        `At Bright Inventions, you are quickly recognized and valued for a job well done. I also appreciate the trust and flexibility we're given.`,
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/brightdev_passion_tomaszk.png' alt='Tomasz' className='quote-img' />
      ),
      short_name: 'Tomasz',
      bio: 'Senior Backend Developer',
      slug: 'tomasz-k',
      quote:
        'Although I work mostly remotely from Poznań, whenever I attend team retreats in Gdańsk, I feel well taken care of by teammates who always make me feel welcome.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/slawek_team_passion2022.png' alt='Sławek' className='quote-img' />
      ),
      short_name: 'Sławek',
      bio: 'Fullstack Developer',
      slug: 'slawek',
      quote:
        'I value transparency and the absence of workplace politics at Bright Inventions. We focus solely on our tasks and project challenges, with no mind games.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/gosia_team_passion2.png' alt='Małgorzata' className='quote-img' />
      ),
      short_name: 'Małgorzata',
      bio: 'Senior QA Engineer',
      slug: 'malgorzata-z',
      quote:
        'I’ve always enjoyed running, but never had someone to share this passion with until I joined the running workouts at Bright Inventions. Thanks to our trainer, Bartosz Banach, and his coaching, I was able to finish a marathon.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/kamil_passion_2022.png' alt='Kamil' className='quote-img' />
      ),
      short_name: 'Kamil',
      bio: 'Senior iOS Developer',
      slug: 'kamil-b',
      quote:
        'People here are passionate about their work. I know it sounds cliche, but it’s true. When looking at tedious tasks – our first thought is how we can automate it. The second one is – how we can improve it.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/arturs_passion.png' alt='Artur' className='quote-img' />,
      short_name: 'Artur',
      bio: 'Senior iOS Developer',
      slug: 'arturs',
      quote:
        'I joined Bright Inventions over 5 years ago. There was never a case when I would land on a team without somebody I could learn something from. I have built products that are used and appreciated by users.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/asia_passion.png' alt='Joanna' className='quote-img' />,
      short_name: 'Joanna',
      bio: 'Junior Product Designer',
      slug: 'joanna-c',
      quote:
        'I enjoy the culture of knowledge sharing at Bright Inventions. Although we have teams working for various clients, there is communication between the teams. When I face some challenges, it often turns out that another team can offer their advice.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/bartek_k_passion.png' alt='Bartek' className='quote-img' />
      ),
      short_name: 'Bartek',
      bio: 'Backend Developer',
      slug: 'bartek-k',
      quote:
        'What’s unique about Bright Inventions is the mature process of software development. The team is highly skilled and experienced. We focus 100% on quality.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/jacek_passion.png' alt='Jacek' className='quote-img' />,
      short_name: 'Jacek',
      bio: 'Senior Backend Developer',
      slug: 'jacek',
      quote:
        'People here are great, as well as the technologies we use. We aren’t afraid of implementing new solutions. Also, I love the spirit of knowledge-sharing that I’ve experienced since joining Bright Inventions.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/tomasz_l_passion.png' alt='Tomasz' className='quote-img' />
      ),
      short_name: 'Tomasz',
      bio: 'Senior iOS Developer',
      slug: 'tomasz-l',
      quote:
        'This is the place where I got back my passion for software development. It’s great to share the same passion with others at Bright Inventions.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/agnieszka_passion.png' alt='Agnieszka' className='quote-img' />
      ),
      short_name: 'Agnieszka',
      bio: 'Senior Fullstack Developer',
      slug: 'agnieszka',
      quote:
        'Bright people treat each other with respect and you can feel that they do work that really gives them satisfaction. If I struggle with some technical or communication challenge, I always have somebody I can talk to about it and I know we will solve it.',
    },
    {
      avatar_hover: (
        <StaticImage
          src='../../static/images/brightdev_passion_jedrzej2022.png'
          alt='Jędrzej'
          className='quote-img'
        />
      ),
      short_name: 'Jędrzej',
      bio: 'Senior Frontend Developer',
      slug: 'jedrzej-s',
      quote:
        'Why did I choose Bright Inventions? Actually, because of the very intriguing tech interview I had. It was a long, 2-hour interview. However, after finishing it I felt that these were the people I wanted to work with.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/filip2_passion.png' alt='Filip' className='quote-img' />,
      short_name: 'Filip',
      bio: 'Senior iOS Developer',
      slug: 'filip',
      quote:
        'I love that we are partners to our clients and bring something more to the table than lines of code. We get to work on the solution, and business expectations, and we can choose technologies and frameworks. Here you really influence your project.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/kasia_g_passion.png' alt='Kasia G' className='quote-img' />
      ),
      short_name: 'Kasia',
      bio: 'Project Manager',
      slug: 'kasia-g',
      quote:
        'I work on a very rewarding project. Not every day you get a chance to build tech for humanitarian purposes. I really feel that we work on something that has greater meaning.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/ola_passion_team.png' alt='Ola' className='quote-img' />,
      short_name: 'Aleksandra',
      bio: 'Fullstack Developer',
      slug: 'aleksandra-z',
      quote:
        'Despite being forced by the covid-19 to work remotely, I was still able to code for my dream company with Bright people. When I log in to work in the morning, I feel like I am coming to the office. Even though I live at the other end of Poland.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/szymon_passion2022.png' alt='Szymon' className='quote-img' />
      ),
      short_name: 'Szymon',
      bio: 'Senior Frontend Developer',
      slug: 'szymon-ch',
      quote:
        'We are encouraged not only to grow internally but also to share knowledge with others, even outside our organization. For example to write blog posts, apply to be a speaker at various conferences, etc.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/michal_w_passion_team.png' alt='Michal' className='quote-img' />
      ),
      short_name: 'Michał',
      bio: 'Senior iOS Developer',
      slug: 'michal-was',
      quote:
        'Bright Inventions gathers people with a unique mindset. People here are very engaged in their job and projects. Every time I talk to someone I can see that they are deeply invested in what they do.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/piotr_rutka_passions.png' alt='Piotr' className='quote-img' />
      ),
      short_name: 'Piotr',
      bio: 'Senior Android Developer',
      slug: 'piotr-r',
      quote:
        'I have learned one simple super-important thing here – my work will be full of joy if it has true meaning to someone. The more your work matters, the more responsible you are. It speeds up your self-improvement a lot.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/kasia_l.png' alt='Kasia' className='quote-img' />,
      short_name: 'Kasia',
      bio: 'Senior Project Manager',
      slug: 'kasia',
      quote:
        'I love working with people at Bright. We create a group of people who not only want to do their tasks well but also bring added value with their great work every day.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/cezary_passion.png' alt='Cezary' className='quote-img' />,
      short_name: 'Cezary',
      bio: 'Android Developer',
      slug: 'cezary',
      quote:
        'What I like about Bright Inventions is the flat structure, work-life balance, great team retreats, competitive salary, and the simple fact that normal people work here. Normal in a good way. ;)',
    },
    {
      avatar_hover: (
        <StaticImage src='../../static/images/agata_passion_small.png' alt='Agata' className='quote-img' />
      ),
      short_name: 'Agata',
      bio: 'Social Media Specialist',
      slug: 'agata',
      quote:
        'For me, diving into an IT branch meant getting out of my comfort zone. Bright Inventions made the dive really pleasant, because they (we!) respect and accept the person just the way he/she is. Like in a big, loving, modern family. ;)',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/rafal_passion.png' alt='Rafał' className='quote-img' />,
      short_name: 'Rafał',
      bio: 'Senior Fullstack Developer',
      slug: 'rafal-h',
      quote:
        'The crucial thing about working at Bright Inventions is that this is a company with a human touch. Everyone is open and friendly to each other. And your boss is not some evil guy you don’t like as it often is a case in other workplaces.',
    },
    {
      avatar_hover: <StaticImage src='../../static/images/szymek_passion.png' alt='Szymek' className='quote-img' />,
      short_name: 'Szymek',
      bio: 'Android & Web Developer',
      slug: 'szymek',
      quote:
        'Łukasz, who works at Bright, is my friend from college. He recommended me this place. When I first came to the office for an interview I instantly felt this warm, cozy atmosphere. I knew that working at Bright was something I desired.',
    },
  ]
  return (
    <SectionEx>
      <CustomSectionTitle tabletMargin='116px 0 50px' margin='154px 0 50px'>
        our team about working at <span>bright</span>
      </CustomSectionTitle>
      <CarouselQuotesSwiper quotes={quotes} />
    </SectionEx>
  )
}

export default OurWork
