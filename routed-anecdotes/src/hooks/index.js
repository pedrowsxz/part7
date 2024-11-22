import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  return {
    input:{
      name, value, onChange
    },
    resetValue
  }
}