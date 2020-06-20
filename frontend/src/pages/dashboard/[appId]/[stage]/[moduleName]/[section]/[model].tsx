// Dependencies
import React, { FC, ReactElement, createElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import Schema from '@dashboard/components/Schema'
import Content from '@dashboard/components/Content'
import Create from '@dashboard/components/Content/Create'
import Edit from '@dashboard/components/Content/Edit'
import PageNotFound from '@dashboard/components/Error/PageNotFound'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_ENUMERATIONS_BY_APP_ID_QUERY from '@graphql/enumerations/getEnumerationsByAppId.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'

const Page: FC = (): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, section, moduleName, model, entryId = '' } = router.query
  let dataModel: any = null

  // Executing Queries
  if (section === 'model') {
    const response = useQuery(GET_MODEL_QUERY, {
      variables: {
        identifier: model,
        appId
      }
    })

    dataModel = response.data
  }

  const { data: dataEnumerationsByAppId } = useQuery(GET_ENUMERATIONS_BY_APP_ID_QUERY, {
    variables: {
      appId
    }
  })

  const { data: dataDeclarations } = useQuery(GET_DECLARATIONS_QUERY)

  // First render?
  if (section === 'model' && !dataModel && !dataDeclarations) {
    return <div />
  }

  if (!dataEnumerationsByAppId) {
    return <div />
  }

  // Pages components
  const Pages: any = {
    schema: Schema,
    content: Content,
    create: Create,
    edit: Edit
  }

  const renderPage = (page: any) => {
    if (Pages[page]) {
      return createElement(Pages[page], {
        router: router.query,
        data: {
          section,
          entryId,
          ...dataEnumerationsByAppId,
          ...dataModel,
          ...dataDeclarations
        }
      })
    }

    return <PageNotFound />
  }

  return (
    <UserProvider>
      <AppProvider id={appId}>
        <FormProvider>{renderPage(moduleName)}</FormProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default Page
