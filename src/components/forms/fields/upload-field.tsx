import React, { ChangeEvent, DOMAttributes, ReactElement } from 'react'
import { UploadFieldContainer } from './fields.styled'
import { UploadIcon } from '../../icons/Upload.icon'

interface Props {
  label?: string
  children?: any
  required?: boolean
  name?: string
  accept?: string
  onChange?(event: ChangeEvent): void
  onClick?: DOMAttributes<HTMLInputElement>['onClick']
  multiple?: HTMLInputElement['multiple']
}
const DEFAULT_CHILDREN = (
  <>
    <UploadIcon /> <span>upload file</span>
  </>
)

export function UploadField({ children, ...props }: Props) {
  return (
    <UploadFieldContainer>
      <span>{children || DEFAULT_CHILDREN}</span>
      <input type='file' {...props} style={{ display: 'none' }} />
    </UploadFieldContainer>
  )
}
