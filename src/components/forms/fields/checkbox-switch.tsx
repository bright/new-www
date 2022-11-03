import React, { ChangeEvent, useState } from 'react'

import { CheckboxSwitchContainer } from './fields.styled'
interface Props {
  label?: string
  required?: boolean
  name?: string
  checked?: boolean
  onChange?(event: ChangeEvent): void
}
export const CheckboxSwitch: React.FC<Props> = function CheckboxSwitch({ children, name, ...props }) {
  return (
    <CheckboxSwitchContainer>
      <input type='checkbox' id={name || 'checkbox'} name={name || 'checkbox'} {...props} />
      <label htmlFor={name || 'checkbox'}>
        <span className='inner' />
        <span className='switch' />
      </label>
      <span>{children}</span>
    </CheckboxSwitchContainer>
  )
}
