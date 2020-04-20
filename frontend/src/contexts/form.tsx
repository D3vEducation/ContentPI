// Dependencies
import React, { FC, ReactElement, useState, createContext } from 'react'

// Interfaces
interface iFormContext {
  onChange(e: any): any
  setInitialValues(values: any): any
  setValue(key: string, value: any): any
  values: any
}

interface iProps {
  children: ReactElement
  initialValues?: object
}

export const FormContext = createContext<iFormContext>({
  onChange: () => null,
  setInitialValues: () => null,
  setValue: () => null,
  values: {}
})

const FormProvider: FC<iProps> = ({ children, initialValues = {} }): ReactElement => {
  const [state, setState] = useState(initialValues)

  function onChange(e: any): void {
    const {
      target: { name, value }
    } = e

    if (name) {
      setState(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  function setValue(key: string, value: any): void {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  function setInitialValues(values: any): void {
    if (Object.keys(state).length === 0) {
      setState(values)
    }
  }

  const context = {
    onChange,
    setInitialValues,
    setValue,
    values: state
  }

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}

export default FormProvider
