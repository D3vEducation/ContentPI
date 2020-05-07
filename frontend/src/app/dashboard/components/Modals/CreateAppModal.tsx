// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { Modal, Badge, Input, DarkButton, Icon } from 'fogg-ui'
import { generateHexCode, invertHexCode, redirectTo, slugFn, getEmptyValues } from 'fogg-utils'
import { useMutation } from '@apollo/react-hooks'

// Contexts
import { FormContext } from '@contexts/form'
import { UserContext } from '@contexts/user'

// Mutation
import CREATE_APP_MUTATION from '@graphql/apps/createApp.mutation'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateAppModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // States
  const [required, setRequired] = useState<any>({
    appName: false,
    identifier: false
  })

  // Mutations
  const [createAppMutation] = useMutation(CREATE_APP_MUTATION)

  // Contexts
  const { user } = useContext(UserContext)
  const { onChange, values, setInitialValues, setValue } = useContext(FormContext)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['appName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      const { data: dataCreateApp } = await createAppMutation({
        variables: values
      })

      if (dataCreateApp.createApp) {
        redirectTo(`/dashboard/${dataCreateApp.createApp.id}/master`)
      }
    }
  }

  const handleIconColor = (): void => setValue('icon', generateHexCode())

  const _onChange = (e: any): any => {
    setValue('identifier', slugFn(e.target.value))
    onChange(e)
  }

  // Effects
  useEffect(() => {
    // Setting up our initial values
    if (user) {
      setInitialValues({
        appName: '',
        identifier: '',
        icon: generateHexCode(),
        description: '',
        userId: user.id
      })
    }
  }, [user])

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div>
        <label htmlFor="appName">
          App Name {required.appName && <Badge danger>Required</Badge>}
        </label>
        <Input
          name="appName"
          placeholder="First App? Try Blog or Forums"
          hasError={required.appName}
          onChange={_onChange}
          value={values.appName}
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
        <label htmlFor="icon">
          Icon Color <Icon type="fas fa-sync-alt" onClick={handleIconColor} />
        </label>
        <Input
          name="icon"
          onChange={onChange}
          value={values.icon}
          readOnly
          style={{
            color: invertHexCode(values.icon),
            backgroundColor: values.icon
          }}
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
        <DarkButton onClick={handleSubmit}>Create App</DarkButton>
      </div>
    </Modal>
  )
}

export default memo(CreateAppModal)
