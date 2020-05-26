// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Table, PrimaryButton } from 'fogg-ui'

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

  // Fake data
  const rows = [
    {
      id: '146cd97d-5d00-4597-91b3-47b71209f2a3',
      title: 'My first post super looooooooooooooooooong',
      readingTime: '3 minutes',
      language: 'en',
      createdAt: '2019-12-23T04:44:17.883Z',
      status: 'Published',
      tags: [
        {
          name: 'react'
        },
        {
          name: 'php'
        }
      ]
    },
    {
      id: '2e22fde5-bb2f-4f6b-8dfa-1ab5bf91182b',
      title: 'My second post super looooooooooooooooooong',
      readingTime: '7 minutes',
      language: 'es',
      status: 'Changed',
      createdAt: '2019-12-23T05:44:17.883Z',
      tags: [
        {
          name: 'graphql'
        },
        {
          name: 'apollo'
        }
      ]
    },
    {
      id: '3e22fde5-bb2f-4f6b-8dfa-1ab5bf91182b',
      title: 'My second post super looooooooooooooooooong',
      readingTime: '7 minutes',
      language: 'es',
      status: 'Deleted',
      createdAt: '2019-12-23T04:44:17.883Z',
      tags: [
        {
          name: 'graphql'
        },
        {
          name: 'apollo'
        }
      ]
    },
    {
      id: '4e22fde5-bb2f-4f6b-8dfa-1ab5bf91182b',
      title: 'My second post super looooooooooooooooooong looooooooooooooooooong',
      readingTime: '7 minutes',
      language: 'es',
      status: 'Draft',
      createdAt: '2019-12-23T04:44:17.883Z',
      tags: [
        {
          name: 'graphql'
        },
        {
          name: 'apollo'
        }
      ]
    }
  ]

  return (
    <MainLayout title="Schema" header content footer sidebar noWrapper>
      <div className={styles.content}>
        <div className={styles.model}>
          <PrimaryButton>+ Create new</PrimaryButton>
        </div>

        <div className={styles.rows}>
          <Table
            url={url}
            data={{
              head: ['ID', 'Title', 'Reading Time', 'Language', 'Tags', 'Date', 'Status'],
              body: ['id', 'title', 'readingTime', 'language', 'tags.name', 'createdAt', 'status'],
              rows
            }}
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
