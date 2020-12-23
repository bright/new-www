import styled from "styled-components"
import variables from "../../styles/variables"

export const Container = styled.div({
  marginTop: "90px",
  marginBottom: "90px",

  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
})

export const ContentWrapper = styled.div({
  maxWidth: "995px",

  display: "flex",
  flexDirection: "column",
})

export const DescriptionWrapper = styled.div({
  display: "flex",
  flexDirection: "column",

  padding: "0 20px",
  
})

export const Title = styled.div({
  fontWeight: "bold",
  fontSize: "32px",
  lineHeight: "39px",
  fontFamily: variables.headerFont,

  color: variables.blackTextColor,

  textAlign: "left",

  marginBottom: "20px",
})

export const SubTitle = styled(Title)({
  fontSize: "32px",
  lineHeight: "40px",

  marginTop: "105px",
  marginBottom: "0px",
})

export const Paragraph = styled.div({
  fontSize: "22px",
  lineHeight: "40px",
  fontFamily: variables.textFont,

  color: variables.blackTextColor,

  marginTop: "50px",
})
