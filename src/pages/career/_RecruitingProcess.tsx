import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Section } from '../../components/shared'
import { CustomSectionTitle } from '../../components/shared/index.styled'
import variables from '../../styles/variables'
import RecruitingProcessDesktop from './_RecruitingProcessDesktop'
import RecruitingProcessMobile from './_RecruitingProcessMobile'
import { useWindowSize } from '../../components/utils/use-windowsize'

const RecruitingSection = styled(Section)`
  padding: 2rem 15rem 6rem 15rem;
  @media ${variables.device.laptop} {
    padding: 0 6rem 1.625rem 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 0 9rem 1.625rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 0 0 7.25rem 2.25rem;
  }
  @media ${variables.device.mobile} {
    padding: 0 0 5rem 1rem;
  }
`

const RecruitingTitle = styled(CustomSectionTitle)`
  margin-bottom: 4rem;
  font-size: 2.5rem;
  line-height: 3.125rem;
  font-weight: 900;
  @media ${variables.device.laptop} {
    font-size: 2.125rem;
    line-height: 2.625rem;
  }
  @media ${variables.device.tablet} {
    margin-bottom: ${variables.pxToRem(76)};
  }
  @media ${variables.device.mobile} {
    font-size: 1.375rem;
    margin-bottom: ${variables.pxToRem(40)};
  }
`

interface Props {
  recruting_image2_title?: string
  recruting_image3_title?: string
}

const RecruitingProcess: React.FC<Props> = ({ recruting_image2_title, recruting_image3_title }) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const { width } = useWindowSize()
  const breakpoint = 992

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10 && !isScrolledDown) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [])
  const blocks = useMemo(
    () => [
      { image: '/images/career/recruiting/cv_review.png', title: 'CV screening', isOnlyOnMobile: false },
      {
        image: '/images/career/recruiting/interview.png',
        title: 'interview (technical part & non-technical part)',
        isOnlyOnMobile: false,
      },
      { image: '/images/career/recruiting/Programming_task.png', title: 'programming task', isOnlyOnMobile: false },
      {
        image: '/images/career/recruiting/skills evaluation and feedback.png',
        title: 'skills evaluation and feedback',
        isOnlyOnMobile: false,
      },
      {
        image: '/images/career/recruiting/congrats.png',
        title: 'congrats! you are a part of a bright team!',
        isOnlyOnMobile: true,
      },
    ],
    []
  )

  return (
    <RecruitingSection>
      <RecruitingTitle>recruiting process</RecruitingTitle>
      {width > breakpoint && isScrolledDown && (
        <RecruitingProcessDesktop
          blocks={blocks}
          recruting_image2_title={recruting_image2_title}
          recruting_image3_title={recruting_image3_title}
        />
      )}
      {width <= breakpoint && isScrolledDown && (
        <RecruitingProcessMobile
          blocks={blocks}
          recruting_image2_title={recruting_image2_title}
          recruting_image3_title={recruting_image3_title}
        />
      )}
    </RecruitingSection>
  )
}

export default RecruitingProcess
