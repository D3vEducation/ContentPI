// Dependencies
import React, { FC, ReactElement, useState, useEffect, useContext, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton, Toggle } from 'fogg-ui'
import { camelCase, getEmptyValues, isEmptyObject, redirectTo, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/react-hooks'

// Hooks
import usePrevious from '@hooks/usePrevious'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import EDIT_FIELD_MUTATION from '@graphql/fields/editField.mutation'

// Styles
import styles from './EditFieldModal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const EditFieldModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting data from options
  const {
    data: { id: fieldId, fields }
  } = options

  // Previous Props
  const prevProps: any = usePrevious({ options })

  // States
  const [required, setRequired] = useState<any>({
    appName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [editFieldMutation] = useMutation(EDIT_FIELD_MUTATION)

  // Contexts
  const { onChange, values, setInitialValues, setValue, setValues, resetValues } = useContext(
    FormContext
  )
  const formCtx = 'editField'

  // Methods
  const _onClose = (): any => {
    resetValues()
    onClose()
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'fieldName') {
      setValue('identifier', camelCase(e.target.value), formCtx)
    }

    onChange(e, formCtx)
  }

  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values[formCtx], ['appName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(1).then(async () => {
        setLoading(false)

        const edited = await editFieldMutation({
          variables: {
            id: fieldId,
            ...values[formCtx]
          }
        })

        if (edited) {
          redirectTo('_self')
        }
      })
    }
  }

  // Effects
  useEffect(() => {
    const currentField = fields ? fields.filter((field: any) => field.id === fieldId) : []

    if (fields && isEmptyObject(values)) {
      setInitialValues({
        [formCtx]: currentField[0],
        createField: {}
      })
    } else if (prevProps && prevProps.options !== options && !isEmptyObject(values) && fields) {
      setValues({
        [formCtx]: currentField[0]
      })
    }
  }, [values, fields, options])

  // Wait until we set our form context
  if (!values[formCtx]) {
    return <div />
  }

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
            value={values[formCtx].fieldName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            Identifier {required.identifier && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="identifier"
            name="identifier"
            value={values[formCtx].identifier}
            hasError={required.identifier}
            onChange={_onChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Input
            name="description"
            placeholder="Small description about your new app"
            onChange={_onChange}
            value={values[formCtx].description}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Make field required"
            onChange={(): void => setValue('isRequired', !values[formCtx].isRequired, formCtx)}
            checked={values[formCtx].isRequired}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as Primary Key"
            onChange={(): void => setValue('isPrimaryKey', !values[formCtx].isPrimaryKey, formCtx)}
            checked={values[formCtx].isPrimaryKey}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as unique"
            onChange={(): void => setValue('isUnique', !values[formCtx].isUnique, formCtx)}
            checked={values[formCtx].isUnique}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Is System Field?"
            onChange={(): void => setValue('isSystem', !values[formCtx].isSystem, formCtx)}
            checked={values[formCtx].isSystem}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Hide field"
            onChange={(): void => setValue('isHide', !values[formCtx].isHide, formCtx)}
            checked={values[formCtx].isHide}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Is Media (image, video or document)?"
            onChange={(): void => setValue('isMedia', !values[formCtx].isMedia, formCtx)}
            checked={values[formCtx].isMedia}
          />
        </div>

        <div className={styles.buttons}>
          <LinkButton onClick={_onClose}>Cancel</LinkButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Updating Field...">
            Update Field
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(EditFieldModal)
