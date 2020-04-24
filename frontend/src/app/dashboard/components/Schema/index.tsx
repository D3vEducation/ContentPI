// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { cx, getParams } from 'fogg-utils'
import { Icon, Toggle } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Schema.scss'

const Schema: FC = (): ReactElement => {
  // State
  const [showSystem, setShowSystem] = useState(false)

  // Contexts
  const { get, state } = useContext(AppContext)

  // Methods
  const fetch = async (): Promise<void> => {
    const { model } = getParams(['page', 'appId', 'stage', 'module', 'section', 'model'])

    await get({
      query: GET_MODEL_QUERY,
      variables: {
        identifier: model
      }
    })
  }

  // Effects
  useEffect(() => {
    if (!state.getModel) {
      fetch()
    }
  }, [state])

  // First render
  if (!state.getModel) {
    return <div />
  }

  const { getModel } = state

  return (
    <MainLayout title="Schema" header content footer sidebar>
      <div className={styles.schema}>
        <div className={styles.model}>
          <h3 className={styles.name}>{getModel.modelName}</h3>{' '}
          <span className={styles.identifier}>#{getModel.identifier}</span>
        </div>

        <p>
          <Toggle
            type="round"
            label="Show system fields"
            onClick={(): void => setShowSystem(!showSystem)}
          />
        </p>

        <div className={styles.fields}>
          {getModel.fields.map((field: any) => (
            <div
              className={cx(
                styles.field,
                field.isSystem ? styles.sys : styles[field.type],
                field.isSystem && !showSystem ? styles.hideSys : ''
              )}
            >
              <div className={cx(styles.icon, styles[field.type])}>
                {field.type === 'ID' && (
                  <Icon title={field.description} className={styles.id}>
                    ID
                  </Icon>
                )}
                {field.type === 'DateTime' && (
                  <Icon title={field.description} type="fas fa-clock" />
                )}
                {field.type === 'Status' && (
                  <Icon title={field.description} type="fas fa-low-vision" />
                )}
                {field.type === 'String' && <Icon title={field.description} type="fas fa-font" />}
                {field.type === 'Text' && (
                  <Icon title={field.description} type="fas fa-quote-right" />
                )}
                {field.type === 'Media' && <Icon title={field.description} type="fas fa-image" />}
                {field.type === 'Boolean' && (
                  <Icon title={field.description} type="fas fa-toggle-on" />
                )}
              </div>

              <div className={styles.name}>
                {field.fieldName}
                <span className={styles.identifier}>#{field.identifier}</span>

                <div className={styles.information}>
                  {field.type !== 'Media' && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      {field.type}
                    </span>
                  )}
                  {field.isPrimaryKey && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      Primary Key
                    </span>
                  )}
                  {field.isRequired && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      Required
                    </span>
                  )}
                  {field.isUnique && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      Unique
                    </span>
                  )}
                  {field.isMedia && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      Media
                    </span>
                  )}
                  {field.isHide && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      Hide
                    </span>
                  )}
                  {field.isSystem && (
                    <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                      System Field
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(Schema)
