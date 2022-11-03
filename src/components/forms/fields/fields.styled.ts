import styled from 'styled-components'
import variables from '../../../styles/variables'

export const TextFieldContainer = styled.label`
  display: grid;
  font-size: 1rem;
  line-height: 2.5rem;
  font-family: Lato;
  input,
  textarea {
    border-radius: 0;
    border: 1px solid #888888;
    background: inherit;
    padding: 1.25rem;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    &:focus-visible {
      outline: 1px solid #000;
      background: inherit;
    }
    &:focus:not(:focus-visible) {
      outline: 0;
    }
  }
`

export const UploadFieldContainer = styled.label`
  border: 1px solid var(--orange-200);
  padding: 8px 18px;
  justify-self: start;
  font-family: Montserrat;
  cursor: pointer;
  input {
    opacity: 0;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
  }
  & > span {
    text-transform: lowercase;
    padding: 8px 18px;
    font-size: 18px;
    line-height: 40px;
    color: black;
    svg {
      fill: black;
      margin-right: 0.625rem;
      vertical-align: middle;
    }
  }
  @media ${variables.device.mobile} {
    display: block;
    width: 100%;
    justify-self: center;
  }
`

export const CheckboxFieldContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-family: Lato;
  user-select: none;
  label {
    justify-self: start;
    border: 1px solid #888888;
    width: 40px;
    height: 40px;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-right: 1.1875rem;
  }
  input {
    position: absolute;
    opacity: 0;
  }
  input:checked ~ label {
    background: black;
  }
  svg {
    stroke: #fff;
  }
`

export const AttachmentUploaded = styled.div`
  width: fit-content;
  margin-top: 2.25rem;
  padding: 0 1.125rem;
  border: 1px solid rgba(136, 136, 136, 0.66);
  & span {
    font-size: 1.125rem;
    line-height: 2.5rem;
    word-break: break-all;
    color: var(--black);
  }
  & button {
    padding-left: 1.125rem;
    font-size: 1.125rem;
    text-transform: uppercase;
    border: none;
    background-color: transparent;
  }
`
