import { Link } from 'gatsby'
import styled from 'styled-components'
import variables from '../../../styles/variables'

export const TagsWrapper = styled.ul<{ isBlogTagsAll: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem 0;
  gap: ${variables.pxToRem(18)};
  & > li {
    flex-basis: calc(100% / 5 - 18px);
    height: 47px;
    border: 1px solid #d3d3d3;
    font-size: ${({ isBlogTagsAll }) =>
      isBlogTagsAll ? 'clamp(0.875rem, 0.3684rem + 0.5263vw, 1rem)' : 'clamp(0.6875rem, -0.5789rem + 1.3158vw, 1rem);'};
    text-align: center;

    &:hover {
      border: 1px solid #f7931e;
    }
  }
  @media ${variables.device.laptop} {
    & li {
    }
  }
  @media ${variables.device.tabletXL} {
    & li {
    }
  }
`
export const TagsLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0a0a0a;

  &.is-active {
    font-weight: bold;
    border: 1px solid #f7931e;
  }
  &::first-letter {
    text-transform: lowercase;
  }
`
export const SubTagsWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  & > li {
    margin-right: 3rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
    &.is-active {
      font-weight: 900;
    }
    &:last-of-type {
      margin-right: 0;
    }
    & > a {
      color: ${variables.color.text};
    }
  }
`
export const TagsSelect = styled.select`
  width: 100%;
  height: 2.75rem;
  margin: 2.25rem 0;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${variables.color.text};
  padding: 0 1.125rem;

  & option {
    background-color: #fff;
    box-shadow: 0px 0px 40px #0000001d;
    margin: 3.4375rem 0;
  }
`
