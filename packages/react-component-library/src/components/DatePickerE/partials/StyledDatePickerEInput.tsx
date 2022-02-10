import styled, { css } from 'styled-components'

import { StyledInput } from '../../TextInputE/partials/StyledInput'

interface StyledDatePickerInputProps {
  $isDisabled?: boolean
}

export const StyledDatePickerEInput = styled.div<StyledDatePickerInputProps>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  padding: 0;
  border: 0;
  vertical-align: top;
  width: 100%;
  min-width: 16rem;

  ${StyledInput}:not(:focus)::placeholder {
    color: transparent;
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;

      * {
        cursor: not-allowed;
      }
    `}
`
