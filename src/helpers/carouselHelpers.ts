import styled from "styled-components"

export const IndicatorActive = styled.li`
  color: black;
  font-size: 4em;
  display: inline-block;
`

export const IndicatorInactive = styled(IndicatorActive)`
  cursor: pointer;
  opacity: 0.42;
`

export const Arrow = styled.div`
  position: absolute;
  z-index: 2;
  top: calc(50% - 15px);
  /* width: 30px;
  height: 30px; */
  cursor: pointer;
  display: inline-block;
  /* color: white; */
`

export const ArrowWhite = styled(Arrow)`
  /* stroke: white; */
  top: calc(50% - 30px);
  fill: white;
`
