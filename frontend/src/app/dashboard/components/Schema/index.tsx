// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { cx, getParamsFromUrl } from 'fogg-utils'
import { Toggle } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Fields from './Fields'
import Declarations from './Declarations'

// Styles
import styles from './Schema.scss'

const Schema: FC = (): ReactElement => {
  // State
  const [isFetching, setIsFetching] = useState(true)
  const [showSystem, setShowSystem] = useState(false)

  // Contexts
  const { get, state } = useContext(AppContext)

  // Methods
  const fetch = async (): Promise<void> => {
    const { model } = getParamsFromUrl(['page', 'appId', 'stage', 'module', 'section', 'model'])

    await get({
      queries: [
        {
          query: GET_MODEL_QUERY,
          variables: {
            identifier: model
          }
        },
        {
          query: GET_DECLARATIONS_QUERY
        }
      ]
    })
  }

  // Effects
  useEffect(() => {
    if (isFetching) {
      fetch()
      setIsFetching(false)
    }
  }, [isFetching])

  const { getModel, getDeclarations } = state

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  return (
    <MainLayout title="Schema" header content footer sidebar>
      <div className={styles.schema}>
        <div className={styles.model}>
          <h3 className={styles.name}>{getModel.modelName}</h3>{' '}
          <span className={styles.identifier}>#{getModel.identifier}</span>
        </div>

        <div className={styles.toggle}>
          <Toggle
            checked={showSystem}
            type="round"
            label="Show system fields"
            onClick={(): void => setShowSystem(!showSystem)}
          />
        </div>

        <div className={styles.wrapper}>
          <Fields fields={getModel.fields} showSystem={showSystem} />
          <Declarations declarations={getDeclarations} />
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(Schema)
