import React, { ChangeEvent, useState } from "react"
import { TickIcon } from "../../icons/Tick.icon"
import { CheckboxFieldContainer } from "./fields.styled"
interface Props {
  multiline?: boolean
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  name?: string
  checked?: boolean
  onChange?(event: ChangeEvent): void
}
export const CheckboxField: React.FC<Props> = function CheckboxField({
  children,
  name,
  ...props
}) {
  const [state, setState] = useState(false)
  return (
    <CheckboxFieldContainer>
      <input
        type="checkbox"
        id={name || "checkbox"}
        name={name || "checkbox"}
        {...props}
      />
      <label htmlFor={name || "checkbox"}>
        <TickIcon />
      </label>
      <span>{children}</span>
    </CheckboxFieldContainer>
  )
}
