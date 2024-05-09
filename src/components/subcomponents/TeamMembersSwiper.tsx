import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useAuthors } from '../../use-authors/use-authors'
import { routeLinks } from '../../config/routing'
import { Link } from 'gatsby'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { clampBuilder } from '../../helpers/clampBuilder'
import { useTranslation } from 'react-i18next'


const TeamMember = styled.article`
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: ${variables.color.text};

  text-align: center;

  &:hover {
    & .avatar1 {
      opacity: 0;
    }

    & .avatar2 {
      opacity: 1;
    }
  }

  && a {
    display: flex;
    flex-direction: column;

    color: ${variables.color.text};

    p {
      margin: 0;
    }
  }

  @media ${variables.device.tablet} {
    min-height: ${variables.pxToRem(491)};
  }
  @media ${variables.device.mobile} {
    min-height: ${variables.pxToRem(300)};
  }
`

const AvatarWrapper = styled.figure`
  position: relative;
  transition: all 0.3s;
  margin-bottom: 1.125rem !important;
  display: block;
  width: 205px;
  height: 364px;
  margin: 0 auto;

  & .avatar1 {
    opacity: 1;
    width: 205px;
    height: 364px;
    max-height: 100%;
  }

  & .avatar2 {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 364px;
    width: 205px;
  }

  @media ${variables.device.mobile} {
    height: 264px;

    & .avatar1 {
      height: 264px;
    }

    & .avatar2 {
      height: 264px;
    }
  }
`
const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variables.pxToRem(10)};
  flex-grow: 1;

  p strong {
    font-family: ${variables.font.customtitle.monserat};
    font-weight: 900;
    font-size: 2rem;
    line-height: 39px;
  }

  p:nth-child(2) {
    font-family: ${variables.font.customtitle.monserat};
    font-size: 1.25rem;
    line-height: 24px;
  }

  p:last-child {
    font-size: 1.125rem;
    line-height: 22px;
    color: ${variables.color.text};
  }

  @media ${variables.device.mobile} {
    padding: 0 ${clampBuilder(320, 581, 14, 25)} ${clampBuilder(320, 581, 20, 32)};

    p strong {
      font-size: ${variables.pxToRem(22)};
      line-height: ${variables.pxToRem(27)};
    }

    p:nth-child(2) {
      font-size: ${variables.pxToRem(18)};
      line-height: ${variables.pxToRem(22)};
    }

    p:last-child {
      font-size: 1.125rem;
      line-height: 22rem;
    }
  }
`
const OurServiceLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: underline;
  font: normal normal bold ${variables.pxToRem(18)} / ${variables.pxToRem(22)} Montserrat;
  letter-spacing: 0px;
  color: #0a0a0a;
  opacity: 1;
  margin-top: ${variables.pxToRem(39.5)};
  margin-bottom: ${variables.pxToRem(64.5)};

  &:hover {
    color: ${variables.color.primary};
  }

  @media ${variables.device.laptop} {
    margin-top: ${variables.pxToRem(27.5)};
    margin-bottom: ${variables.pxToRem(76.5)};
  }
  @media ${variables.device.tablet} {
    margin-top: ${variables.pxToRem(32.5)};
    margin-bottom: ${variables.pxToRem(32.5)};
  }
`

interface Props {
  authorIdsArray: string[]
}

const TeamMemebersSwiper: React.FC<Props> = ({ authorIdsArray }) => {
  const members = useAuthors({ authorIdsArray })
  const { t } = useTranslation('button')
  return (
    <>
      <Swiper
        slidesPerView={1.1}
        spaceBetween={16}
        loop={false}
        className='team-members-swiper'
        breakpoints={{
          580: {
            slidesPerView: 2.1,
            spaceBetween: 32,
          },
        }}
      >
        {members.map(member => (
          <SwiperSlide key={member.authorId}>
            <TeamMember>
              <Link to={routeLinks.aboutUs(member)}>
                <AvatarWrapper>
                  <GatsbyImage
                    image={getImage(member.avatar)!}
                    alt={member.name}
                    className='avatar1'
                    imgClassName='image'
                  />

                  <GatsbyImage
                    image={getImage(member.avatar_hover)!}
                    alt={member.name}
                    className='avatar2'
                    imgClassName='image'
                  />
                </AvatarWrapper>
                <NameWrapper>
                  <p>
                    <strong>{member.shortName}</strong>
                  </p>
                  <p>{member.bio}</p>
                  <p>{member?.hobby}</p>
                </NameWrapper>
              </Link>
            </TeamMember>
          </SwiperSlide>
        ))}
      </Swiper>
      <OurServiceLink to={routeLinks.aboutUs({ page: 'team' })}>{t("see all team members")}</OurServiceLink>
    </>
  )
}

export default TeamMemebersSwiper
