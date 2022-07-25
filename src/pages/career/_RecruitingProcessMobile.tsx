import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { clampBuilder } from './../../helpers/clampBuilder'

const SlideWrapper = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dbdbdb;
  opacity: 1;
  min-height: 516px;
  padding: 7px ${clampBuilder(581, 992, 38, 139)} 25px;
  & p {
    text-align: center;
    font: normal normal 900 18px/22px Montserrat;
    letter-spacing: 0px;
    color: #0a0a0a;
    opacity: 1;
  }
  @media ${variables.device.mobile} {
    min-height: 346px;
    padding: 16px 23px 38px;
    gap: 32px;
  }
`

const RecruitingFigure = styled.figure`
  @media ${variables.device.mobile} {
    max-height: 346px;
    & img {
      width: 100%;
      height: auto;
    }
  }
`
interface Props {
  recruting_image2_title?: string
  recruting_image3_title?: string
  blocks: { image: string; title: string; isOnlyOnMobile: boolean }[]
}

const RecruitingProcessMobile: React.FC<Props> = ({ recruting_image2_title, recruting_image3_title, blocks }) => {
  return (
    <Swiper
      slidesPerView={1.1}
      spaceBetween={16}
      loop={false}
      className='recruiting-process-swiper'
      breakpoints={{
        580: {
          slidesPerView: 1.1,
          spaceBetween: 32,
        },
      }}
    >
      {blocks.map((block, index) => {
        let title
        if (index === 1 && recruting_image2_title) {
          title = recruting_image2_title
        } else if (index === 2 && recruting_image3_title) {
          title = recruting_image3_title
        } else {
          title = block.title
        }

        return (
          <SwiperSlide>
            <SlideWrapper key={title}>
              <RecruitingFigure>
                <img src={block.image} alt={title} />
              </RecruitingFigure>

              <p>
                {index + 1}. {title}
              </p>
            </SlideWrapper>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
export default RecruitingProcessMobile
