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
export const CheckboxSwitchContainer = styled.label`
  position: relative;
  width: 57px;
  display: inline-block;
  text-align: left;
  top: 8px;

  input {
    display: none;
  }
  label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
    width: 57px;
  }
  .inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .inner:before,
  .inner:after {
    float: left;
    width: 50%;
    height: 36px;
    padding: 0;
    line-height: 36px;
    color: #757575;
    font-weight: bold;
    box-sizing: border-box;
  }
  .inner:before {
    content: '';
    padding-left: 10px;
    background-color: ${variables.color.primary};
    color: #fff;
  }
  .inner:after {
    content: '';
    padding-right: 10px;
    background-color: #d3d3d3;
    color: #757575;
    text-align: right;
  }
  .switch {
    display: block;
    width: 24px;
    margin: 5px;
    background: #757575;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 24px;
    border: 0 solid #bbb;
    border-radius: 16px;
    transition: all 0.3s ease-in 0s;
  }
  input:checked + label .inner {
    margin-left: 0;
  }
  input:checked + label .switch {
    right: 0px;
    background: #fff;
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
