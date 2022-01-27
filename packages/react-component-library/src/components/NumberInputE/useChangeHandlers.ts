import { isNil } from 'lodash'
import React, { useCallback } from 'react'

import { canCommit, isValueValid } from './validation'

export function useChangeHandlers(
  min: number | undefined,
  max: number | undefined,
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    newValue: number
  ) => void,
  setCommittedValue: React.Dispatch<React.SetStateAction<string>>
): {
  handleButtonClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    newValue: string
  ) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isValueValid(event.currentTarget.value)) {
        return
      }

      const newValue = event.currentTarget.value || null

      if (!newValue || canCommit(newValue, min, max)) {
        setCommittedValue(newValue)
        onChange(event, isNil(newValue) ? null : Number(newValue))
      }
    },
    [min, max, onChange, setCommittedValue]
  )

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, newValue: string) => {
      if (canCommit(newValue, min, max)) {
        setCommittedValue(newValue)
        onChange(event, Number(newValue))
      }
    },
    [min, max, onChange, setCommittedValue]
  )

  return {
    handleButtonClick,
    handleInputChange,
  }
}