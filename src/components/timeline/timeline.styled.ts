import styled from "styled-components"

export const StyledElement = styled.article`
  flex: 1;
  margin: 1rem 0;
  padding: 2rem 2.5rem;
  display: grid;
  grid-gap: 1rem;
  &.active {
    box-shadow: 0px 0px 90px #0000001c;
    transform: translate3d(0, -50%, 0);
    background: white;
    border-radius: 8px;
    &::before {
      content: "";
      z-index: -1;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      position: absolute;
      left: 0;
      top: 50%;
      background: white;
      transform: translate3d(-9px, -50%, 0);
      clip-path: polygon(59% 0%, 0% 50%, 59% 100%);
      box-shadow: 0px 0px 90px #000000;
    }

    &.left::before {
      left: 100%;
      transform: translate3d(-8px, -50%, 0);
      clip-path: polygon(41% 0%, 100% 50%, 41% 100%);
    }
  }
  @media (max-width: 601px) {
    &.active {
      transform: translate3d(0, 0, 0);
      &.left::before,
      &.right::before {
        display: none;
      }
    }
  }
`

export const Wrapper = styled.div<{
  height: number
}>`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-top: ${props => props.height + 105}px;
  opacity: ${props => (props.height ? 1 : 0)};
  & > .my-container {
    display: flex;
    grid-template-columns: auto 50px auto;
    grid-auto-rows: minmax(70px, auto);
    position: relative;
    min-height: 70px;
    .separator {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 50px;
      .dot {
        width: 1.0375rem;
        height: 1.0375rem;
        background: #f7931e;
        padding: 4px;
        align-self: baseline;
        border-style: solid;
        border-width: 2px;
        border-color: black;
        border-radius: 50%;
        position: relative;
        box-shadow: inset 0 0 0 3px white;
      }
      .connector {
        width: 0px;
        border-right: 2px dashed rgba(0, 0, 0, 0.19);
        flex-grow: 1;
      }
    }
  }
  @media (max-width: 601px) {
    & > .my-container {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-areas: "timeline milestone";
      & > article {
        grid-area: milestone;
      }
      .separator {
        grid-area: timeline;
      }
      .left:not(.active),
      .right:not(.active) {
        display: none;
      }
    }
  }
`

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 1rem;
  grid-auto-flow: column;
  justify-content: end;
  justify-items: end;
  grid-template-areas: "header";
  h3 {
    justify-self: start;
    grid-area: header;
    margin: 0;
    font-weight: lighter;
    color: #000;
    font-size: 1.75rem;
    line-height: 34px;
  }
`
export const Subheader = styled.strong`
  font-size: 1.375rem;
  line-height: 27px;
  color: var(--black-100);
`
export const Content = styled.p`
  font-size: 1.375rem;
  font-family: Lato;
  line-height: 40px;
`

export const Fadeout = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 10rem;
  background: transparent linear-gradient(180deg, #ffffff00 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
`
