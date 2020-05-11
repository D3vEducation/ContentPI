// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Toggle } from 'fogg-ui'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Fields from './Fields'
import Declarations from './Declarations'

// Styles
import styles from './Schema.scss'

interface iProps {
  data: any
}

const Schema: FC<iProps> = ({ data }): ReactElement => {
  // State
  const [showSystem, setShowSystem] = useState(false)

  // Data
  const { getModel, getDeclarations } = data

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
            onChange={(): void => setShowSystem(!showSystem)}
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
