import styled from "styled-components"
import variables from "../../styles/variables"

export const HideTablet = styled.div({
  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

export const HideDesktop = styled.div({
  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

export const Section = styled.section`
  padding: 2rem 2rem 6rem 2rem;
  color: ${variables.color.text};

  @media ${variables.device.mobile} {
    padding: 2rem 0.5rem 1rem;
  }
`

export const SectionBlack = styled(Section)`
  background-color: ${variables.color.text};
  color: ${variables.color.white};
`

export const SectionInner = styled.div`
  max-width: 955px;
  margin: 0 auto;
`

export const TitleBase = `
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0;
  text-align: center;
`

export const SectionTitle = styled.h3`
  ${TitleBase};
  font-size: 2rem;
  margin: 1em 0 3rem;
`

export const TextTitle = styled.div`
  ${TitleBase};
  margin: 1em 0;
  font-size: 1.2rem;
`

export const TextRegular = styled.div`
  font-family: ${variables.font.text.family};
  font-size: ${variables.font.text.size};
  line-height: 2rem;
`

export const PageTitle = styled.h1`
  ${TitleBase};
  display: block;
  font-family: Montserrat, sans-serif;
  font-size: 3.375rem;
  font-weight: 800;
  line-height: 4rem;
  text-align: center;

  & > span {
    color: ${variables.color.primary};
  }
  
  @media ${variables.device.mobile} {
    font-size: 2.5rem;
  }
`

export const PageDescription = styled(TextRegular)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "30px",
  paddingBottom: "10px",
  margin: "0 auto 2rem",

  textAlign: "left",
  maxWidth: "955px",
  color: variables.color.text,
  padding: "10px",
})


export const Button = styled.div`
  & button {
    border: 1px solid black;
    background: white;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    padding: 0.5rem 2.2rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 3rem;
  }
`
export const CustomContainer = styled.div`
  max-width: 1650px;
  margin: auto;

  /* @media ${variables.device.mobile} {
    max-width: calc(100% - 18px);
  } */
`
export const CustomPageTitle = styled.h1`
  ${TitleBase};
  display: block;
  font-family: Montserrat, sans-serif;
  font-size: 3.375rem;
  font-weight: 800;
  line-height: 4.125rem;
  text-align: center;
  color: #000000;

  & > span {
    color: ${variables.color.primary};
  }
  
  @media ${variables.device.mobile} {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.44rem ;
    text-align: left;
  }
`
export const CustomConstrainedWidthContainer = styled.div`
  max-width: 1854px;
  margin: 0 auto;
  padding: 3.3rem 0;

  @media ${variables.device.mobile} {
    max-width: calc(100% - 36px);
    margin: 0 auto;
    padding: 4rem 0 5rem 0;
  }
`
export const CustomSection = styled.section`
  padding: 2rem 2rem 6rem 2rem;
  color: ${variables.color.text};

  @media ${variables.device.mobile} {
    padding: 2rem 1.125rem 1rem;
  }
`
export const CustomSectionTitle = styled.h3`
  ${TitleBase};
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 3.06rem;
  margin: 9.625rem 0 6.56rem;
  color: #000000;

  @media ${variables.device.mobile} {
  font-size: 1.375rem;
  line-height: 1.6875rem;
  font-weight: 900;
  margin: 5.125rem 0 4rem
  }
`
export const CustomTextTitle = styled.div`
  ${TitleBase};
  margin: 1em 0;
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.6875rem;
`
export const CustomTextRegular = styled.div`
  font-family: ${variables.font.text.family};
  font-size: 1.375rem;
  line-height: 2.5rem;
  opacity: .75;
`