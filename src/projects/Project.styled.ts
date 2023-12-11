import { Link } from 'gatsby'
import image from '../../static/images/bullet_point.svg'
import variables from '../styles/variables'
import styled from 'styled-components'
import { clampBuilder } from '../helpers/clampBuilder'

export const Container = styled.div`
  max-width: 1026px;
  margin: 0 auto;
  @media ${variables.device.tablet} {
    max-width: 991px;
  }

  && .content {
    font-size: ${variables.pxToRem(20)};
    font-weight: 400;
    @media ${variables.device.mobile} {
      font-size: ${variables.pxToRem(16)};
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li,
    .title,
    .subtitle,
    strong {
      color: ${variables.color.heading};
    }
    & h2 {
      font-size: ${variables.pxToRem(40)};
      font-weight: 800;
      font-family: ${variables.font.montserrat};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(34)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(22)};
      }
    }
    & h3 {
      font-size: ${variables.pxToRem(28)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(25)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(18)};
      }
    }
    & p,
    li {
      font-size: ${variables.pxToRem(20)};
      font-weight: 400;

      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(16)};
      }
    }
    & ul {
      list-style: none;
      & li {
        position: relative;
        vertical-align: middle;
        padding-inline-start: 2.1875rem;
        display: list-item;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          vertical-align: middle;
          background: url(${image});
          width: 16px;
          height: 16px;
          z-index: 1;
        }
      }
    }
  }
`

export const ArticleContent = styled.article`
  padding: 0 ${variables.pxToRem(113)};
  @media ${variables.device.tablet} {
    padding: 0 ${variables.pxToRem(36)};
  }
  @media ${variables.device.mobile} {
    padding: 0 ${variables.pxToRem(18)};
  }
`
export const TopProjectArticle = styled.article`
  padding: ${variables.pxToRem(48)} ${variables.pxToRem(113)} 0;
  @media ${variables.device.tablet} {
    padding: ${variables.pxToRem(152)} ${variables.pxToRem(36)} 0;
  }
  @media ${variables.device.mobile} {
    padding: ${variables.pxToRem(48)} ${variables.pxToRem(18)} 0;
  }
`
export const Title = styled.h1`
  font-size: ${variables.pxToRem(64)};
  line-height: ${variables.pxToRem(90)};
  font-weight: 800;
  margin: 0 0 ${variables.pxToRem(33)};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(52)};
    margin: 0 0 ${variables.pxToRem(44)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: ${clampBuilder(320, 412, 22, 32)};
    line-height: ${variables.pxToRem(54)};
    margin: 0 0 ${variables.pxToRem(48)};
    font-weight: 700;
  }
`
export const ProjectTextRegular = styled.div`
  font-size: ${variables.pxToRem(24)};
  line-height: ${variables.pxToRem(40)};
  color: ${variables.color.text2};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(22)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
  }
`
export const ProjectLink = styled(Link)`
  color: ${variables.color.text2};
  padding: ${variables.pxToRem(8)} ${variables.pxToRem(16)};
  border-bottom: 2px solid ${variables.color.primary};
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(40)};
  font-weight: 600;
  background-color: #ffffff;
  transition: all ease-in-out 0.3s;

  &:hover {
    border-bottom: 2px solid ${variables.color.text2};
    background-color: #f5f5f5;
  }
  @media ${variables.device.mobile} {
    font-size: ${clampBuilder(320, 581, 17, 20)};
  }
`
export const SectionContact = styled.div`
  @media ${variables.device.tablet} {
    padding: 0 ${variables.pxToRem(18)};
  }
  @media ${variables.device.mobile} {
    padding: 0;
  }
`
