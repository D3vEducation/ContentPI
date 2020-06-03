// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Table, PrimaryButton } from 'fogg-ui'
import { getValuesForTable } from 'fogg-utils'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Content.scss'

interface iProps {
  router: any
  data: any
}

const Content: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getModel, getDeclarations } = data
  const { appId, stage, section, model } = router

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  // Url for records
  const url = `/dashboard/${appId}/${stage}/content/${section}/${model}`

  return (
    <MainLayout title="Schema" header content footer sidebar noWrapper>
      <div className={styles.content}>
        <div className={styles.model}>
          <PrimaryButton href={`${url}/create`}>+ New Entry</PrimaryButton>
        </div>

        <div className={styles.rows}>
          <Table
            url={url}
            data={getValuesForTable(getModel.fields)}
            onDelete={(ids: any): void => console.log('Delete', ids)}
            onPublish={(ids: any): void => console.log('Publish', ids)}
            onUnpublish={(ids: any): void => console.log('Unpublish', ids)}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(Content)
