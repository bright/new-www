import styled from "styled-components"
import variables from "../../../styles/variables"

export const Header = styled.div({
  font: "normal normal 800 40px/49px Montserrat",
  color: "#000000",
})

export const Description = styled.div({
  font: "normal normal normal 22px/40px Lato",

  marginTop: "55px",
})

export const Form = styled.form({
  marginTop: "55px",
})

export const SubmitButton = styled.button({
  fontSize: "18px",
  lineHeight: "22px",
  fontFamily: variables.headerFont,
  fontWeight: "bold",

  color: variables.white,
  backgroundColor: variables.blackBannerBackground,

  height: "54px",
  width: "230px",

  marginTop: "110px",
  padding: "15px 82px",
})

export const Label = styled.div({
  fontSize: "16px",
  lineHeight: "40px",

  fontFamily: variables.textFont,
  color: variables.blackTextColor,

  marginBottom: "8px",
})

export const TextInput = styled.input({
  height: "70px",
  width: "445px",

  fontSize: "16px",
  lineHeight: "40px",
  fontFamily: variables.textFont,

  color: variables.blackTextColor,
  opacity: 0.56,

  padding: "20px",
  border: `1px solid ${variables.blackTextColor}`,
})

export const SingleSelect = styled.select({
  height: "70px",
  width: "100%",

  fontSize: "16px",
  lineHeight: "40px",

  fontFamily: variables.textFont,
  color: variables.blackTextColor,
  opacity: 0.55,

  padding: "23px",
  border: `1px solid ${variables.blackTextColor}`,

  marginBottom: "64px",
})

export const DoubleInputsRow = styled.div({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,

  flexWrap: "wrap",
  marginBottom: "64px",
})

export const IdeaTextArea = styled.textarea({
  height: "228px",
  maxWidth: "100%",
  width: "100%",

  fontSize: "16px",
  lineHeight: "19px",
  fontFamily: variables.textFont,

  color: variables.black,
  opacity: 0.54,

  padding: "20px",

  border: `1px solid ${variables.blackTextColor}`,

  marginBottom: "64px",
})

export const PrivacyPolicyCheckboxContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  fontSize: "20px",
  lineHeight: "24px",
  fontFamily: variables.textFont,

  color: variables.blackTextColor,
})

export const PrivacyPolicyCheckbox = styled.input({
  height: "40px",
  width: "40px",
  marginRight: "19px",
})

const SubmitMessage = styled.div({
  fontSize: "20px",
  lineHeight: "24px",

  fontFamily: variables.textFont,

  marginTop: "30px",
})

export const ErrorMessage = styled(SubmitMessage)({
  color: "red",
})

export const SuccessMessage = styled(SubmitMessage)({
  color: "green",
})
