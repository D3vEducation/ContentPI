// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { Modal, Badge, Input, DarkButton } from 'fogg-ui'
import { redirectTo, getParamsFromUrl, camelCase, getEmptyValues } from 'fogg-utils'
import { useMutation } from '@apollo/react-hooks'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import CREATE_MODEL_MUTATION from '@graphql/models/createModel.mutation'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateModelModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // States
  const [required, setRequired] = useState<any>({
    modelName: false,
    identifier: false
  })

  // Mutations
  const [createModelMutation] = useMutation(CREATE_MODEL_MUTATION)

  // Contexts
  const { onChange, values, setInitialValues, setValue } = useContext(FormContext)

  // Getting appId
  const { appId } = getParamsFromUrl(['page', 'appId', 'stage'])

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['modelName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      const { data: dataCreateModel } = await createModelMutation({
        variables: values
      })

      if (dataCreateModel.createModel) {
        redirectTo(`/dashboard/${appId}/master/schema/model/${values.identifier}`)
      }
    }
  }

  const _onChange = (e: any): any => {
    setValue('identifier', camelCase(e.target.value))
    onChange(e)
  }

  // Effects
  useEffect(() => {
    // Setting up our initial values
    setInitialValues({
      modelName: '',
      identifier: '',
      description: '',
      appId
    })
  }, [])

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div>
        <label htmlFor="modelName">
          Model Name {required.modelName && <Badge danger>Required</Badge>}
        </label>
        <Input
          name="modelName"
          placeholder="First Model? Try Post"
          hasError={required.modelName}
          onChange={_onChange}
          value={values.modelName}
        />
      </div>

      <div>
        <label htmlFor="identifier">
          Identifier {required.identifier && <Badge danger>Required</Badge>}
        </label>
        <Input
          name="identifier"
          value={values.identifier}
          hasError={required.identifier}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <Input
          name="description"
          placeholder="Small description about your new app"
          onChange={onChange}
          value={values.description}
        />
      </div>

      <div>
        <DarkButton onClick={handleSubmit}>Create Model</DarkButton>
      </div>
    </Modal>
  )
}

export default memo(CreateModelModal)
