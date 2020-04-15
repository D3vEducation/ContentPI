// Dependencies
import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  memo
} from 'react'
import { Modal, Badge, Input, DarkButton, Icon } from 'fogg-ui'
import { generateHexCode, invertHexCode, redirectTo } from 'fogg-utils'

// Contexts
import { FormContext } from '@contexts/form'
import { AppContext } from '@contexts/app'
import { UserContext } from '@contexts/user'

// Mutation
import CREATE_APP_MUTATION from '@graphql/apps/createApp.mutation'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateAppModal: FC<iProps> = ({
  isOpen,
  label,
  onClose,
  options
}): ReactElement => {
  // States
  const [required, setRequired] = useState<any>({
    appName: false
  })

  // Contexts
  const { user } = useContext(UserContext)
  const { onChange, values, setInitialValues, setValue } = useContext(
    FormContext
  )
  const { post } = useContext(AppContext)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    if (values.appName === '') {
      setRequired({
        appName: true
      })
    } else {
      const { createApp } = await post({
        mutation: CREATE_APP_MUTATION,
        variables: values
      })

      if (createApp) {
        redirectTo(`/dashboard/${createApp.id}/master`)
      }
    }
  }

  const handleIconColor = (): void => setValue('icon', generateHexCode())

  // Effects
  useEffect(() => {
    // Setting up our initial values
    setInitialValues({
      appName: '',
      icon: generateHexCode(),
      description: '',
      userId: user.id
    })
  }, [])

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
          onChange={onChange}
          value={values.appName}
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
