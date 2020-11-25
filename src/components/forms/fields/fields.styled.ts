import styled from "styled-components"

export const TextFieldContainer = styled.label`
  display: grid;
  font-size: 1rem;
  line-height: 2.5rem;
  font-family: Lato;
  input,
  textarea {
    border-radius: 0;
    border: 1px solid var(--black-100);
    background: inherit;
    padding: 1.25rem;
    width: 100%;
    resize: vertical;
  }
`

export const UploadFieldContainer = styled.label`
  border: 1px solid var(--orange-200);
  justify-self: start;
  font-family: Montserrat;
  cursor: pointer;
  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  & > span {
    padding: 8px 18px;
    font-size: 18px;
    line-height: 40px;
    color: black;
    svg {
      fill: black;
    }
  }
`

export const CheckboxFieldContainer = styled.label`
  display: flex;
  gap: 1.1875rem;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-family: Lato;
  user-select: none;
  label {
    justify-self: start;
    border: 1px solid var(--black-100);
    width: 40px;
    height: 40px;
    display: grid;
    justify-items: center;
    align-items: center;
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
