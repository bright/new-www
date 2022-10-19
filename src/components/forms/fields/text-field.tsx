import React, { ChangeEvent } from "react"
import { TextFieldContainer } from "./fields.styled"

interface Props {
  multiline?: boolean
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  name?: string
  value?: string
  type?: HTMLInputElement['type']
  onChange?(event: ChangeEvent): void
}
export function TextField({ multiline, label, ...props }: Props) {
  return (
    <TextFieldContainer>
      <span>{label}</span>
      {multiline ? <textarea rows={5} {...props} /> : <input {...props} />}
    </TextFieldContainer>
  )
}
