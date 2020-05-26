// Dependencies
import React, { FC, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import Content from '@dashboard/components/Content'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'

const Page: FC = (): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, model } = router.query

  // Executing Queries
  const { data: dataModel, loading: loadingModel } = useQuery(GET_MODEL_QUERY, {
    variables: {
      identifier: model,
      appId
    }
  })
  const { data: dataDeclarations, loading: loadingDeclarations } = useQuery(GET_DECLARATIONS_QUERY)

  // Loading...
  if (loadingModel || loadingDeclarations) {
    return <div />
  }

  // First render?
  if (!dataModel && !dataDeclarations) {
    return <div />
  }

  return (
    <UserProvider>
      <AppProvider id={appId}>
        <FormProvider>
          {dataModel && dataDeclarations && (
            <Content
              router={router.query}
              data={{
                ...dataModel,
                ...dataDeclarations
              }}
            />
          )}
        </FormProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default Page
