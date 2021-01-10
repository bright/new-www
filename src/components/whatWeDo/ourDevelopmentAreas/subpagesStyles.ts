import styled from "styled-components"
import { SectionTitle, TextRegular, TextTitle } from "../../shared"

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

export const Title = styled(SectionTitle)({
  fontWeight: "bold",
  textAlign: "left",

  marginBottom: "20px",
})

export const SubTitle = styled(TextTitle)({
  marginTop: "105px",
  marginBottom: "0px",
})

export const Paragraph = styled(TextRegular)({
  marginTop: "50px",
})
