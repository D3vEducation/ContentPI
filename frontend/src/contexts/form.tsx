// Dependencies
import React, { FC, ReactElement, useState, createContext } from 'react'

// Interfaces
interface iFormContext {
  onChange(e: any, ctx?: any): any
  setInitialValues(values: any): any
  setValue(name: string, value: any, ctx?: any): any
  setValues(values: any): any
  resetValues(): any
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
  setValues: () => null,
  resetValues: () => null,
  values: {}
})

const FormProvider: FC<iProps> = ({ children, initialValues = {} }): ReactElement => {
  const [state, setState] = useState(initialValues)

  function onChange(e: any, ctx?: any): void {
    const {
      target: { name, value }
    } = e

    if (name) {
      if (ctx) {
        setState((prevState: any) => {
          const ctxPrevState: any = prevState[ctx]

          return {
            ...prevState,
            [ctx]: {
              ...ctxPrevState,
              [name]: value
            }
          }
        })
      } else {
        setState(prevState => ({
          ...prevState,
          [name]: value
        }))
      }
    }
  }

  function setValue(name: string, value: any, ctx?: any): void {
    if (ctx) {
      setState((prevState: any) => {
        const ctxPrevState: any = prevState[ctx]

        return {
          ...prevState,
          [ctx]: {
            ...ctxPrevState,
            [name]: value
          }
        }
      })
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  function setValues(values: any): void {
    if (Object.keys(state).length > 0) {
      setState(values)
    }
  }

  function setInitialValues(values: any): void {
    if (Object.keys(state).length === 0) {
      setState(values)
    } else {
      setState(prevState => ({
        ...prevState,
        values
      }))
    }
  }

  function resetValues(): void {
    if (Object.keys(state).length >= 0) {
      setState({})
    }
  }

  const context = {
    onChange,
    setInitialValues,
    setValue,
    setValues,
    resetValues,
    values: state
  }

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}

export default FormProvider
