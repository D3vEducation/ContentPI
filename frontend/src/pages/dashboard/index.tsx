// Dependencies
import React, { ReactElement } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

// Hooks
import useApolloClient from '@hooks/apollo'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import DashboardLayout from '@app/dashboard/components/Layout'

const DashboardPage = (): ReactElement => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <AppProvider>
        <FormProvider>
          <DashboardLayout />
        </FormProvider>
      </AppProvider>
    </UserProvider>
  </ApolloProvider>
)

export default DashboardPage
