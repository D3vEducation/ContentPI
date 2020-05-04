// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, Toggle } from 'fogg-ui'
import {
  getParamsFromUrl,
  camelCase,
  getEmptyValues,
  isEmptyObject,
  redirectTo,
  waitFor
} from 'fogg-utils'

// Hooks
import usePrevious from '@hooks/usePrevious'

// Contexts
import { FormContext } from '@contexts/form'
import { AppContext } from '@contexts/app'

// Mutation
import CREATE_FIELD_MUTATION from '@graphql/fields/createField.mutation'
import GET_MODEL_QUERY from '@graphql/models/getModel.query'

// Styles
import styles from './CreateFieldModal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateFieldModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // States
  const [required, setRequired] = useState<any>({
    fieldName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Previous Props
  const prevProps: any = usePrevious({ options })

  // Contexts
  const { onChange, values, setInitialValues, setValue, resetValues } = useContext(FormContext)
  const { get, post } = useContext(AppContext)

  // Getting appId
  const { model } = getParamsFromUrl(['page', 'appId', 'stage', 'module', 'section', 'model'])

  // Methods
  const _onChange = (e: any): any => {
    setValue('identifier', camelCase(e.target.value))
    onChange(e)
  }

  const _onClose = (): any => {
    resetValues()
    onClose()
  }

  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['fieldName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(1).then(async () => {
        setLoading(false)

        const { getModel } = await get({
          query: GET_MODEL_QUERY,
          variables: {
            identifier: values.model
          }
        })

        if (getModel && getModel.id) {
          values.modelId = getModel.id

          const { createField } = await post({
            mutation: CREATE_FIELD_MUTATION,
            variables: values
          })

          if (createField) {
            _onClose()
            redirectTo('_self')
          }
        }
      })
    }
  }

  // Effects
  useEffect(() => {
    // Setting up our initial values
    if (isEmptyObject(values)) {
      setInitialValues({
        model,
        fieldName: '',
        identifier: '',
        type: options.type,
        defaultValue: '',
        description: '',
        isHide: false,
        isMedia: false,
        isUnique: false,
        isRequired: true,
        isSystem: false,
        isPrimaryKey: false
      })
    }

    if (prevProps && prevProps.options !== options) {
      setValue('type', options.type)
    }
  }, [values, prevProps, options])

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={_onClose}>
      <div className={styles.modal}>
        <div>
          <label htmlFor="fieldName">
            Field Name {required.fieldName && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="fieldName"
            name="fieldName"
            placeholder="First Field? Try Title"
            hasError={required.fieldName}
            onChange={_onChange}
            value={values.fieldName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            Identifier {required.identifier && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="identifier"
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

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Make field required"
            onClick={(): void => setValue('isRequired', !values.isRequired)}
            checked={values.isRequired}
          />
        </p>

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as Primary Key"
            onClick={(): void => setValue('isPrimaryKey', !values.isPrimaryKey)}
            checked={values.isPrimaryKey}
          />
        </p>

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as unique"
            onClick={(): void => setValue('isUnique', !values.isUnique)}
            checked={values.isUnique}
          />
        </p>

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Is System Field?"
            onClick={(): void => setValue('isSystem', !values.isSystem)}
            checked={values.isSystem}
          />
        </p>

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Hide field"
            onClick={(): void => setValue('isHide', !values.isHide)}
            checked={values.isHide}
          />
        </p>

        <p>
          <Toggle
            color="#42f598"
            type="round"
            label="Is Media (image, video or document)?"
            onClick={(): void => setValue('isMedia', !values.isMedia)}
            checked={values.isMedia}
          />
        </p>

        <div className={styles.buttons}>
          <PrimaryButton outline onClick={_onClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Creating Field...">
            Create Field
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(CreateFieldModal)
