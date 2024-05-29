import styled, { css } from 'styled-components'
import variables, { roundedCorners } from '../../styles/variables'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 36px;
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 6px;
`

export const GroupName = styled.div`
  font-weight: bold;
`

export const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Tag = styled.div<{
  $active?: boolean
}>`
  padding: 4px 12px;
  border-radius: ${roundedCorners};
  border: 1px solid ${variables.color.black};
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${variables.color.black};
      color: ${variables.color.white};
    `
  }
`
