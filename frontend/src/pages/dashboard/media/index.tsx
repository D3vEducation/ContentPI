// Dependencies
import React, { ReactElement } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

// Hooks
import useApolloClient from '@shared/lib/apollo'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import DashboardLayout from '@app/dashboard/components/Layout'

export default (): ReactElement => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <AppProvider>
        <FormProvider>
          <DashboardLayout moduleName="Media" />
        </FormProvider>
      </AppProvider>
    </UserProvider>
  </ApolloProvider>
)
