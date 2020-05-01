// Dependencies
import React, { ReactElement } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { isBrowser } from 'fogg-utils'

// Hooks
import useApolloClient from '@hooks/apollo'

// Contexts
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'

// Components
import LoginLayout from '@app/users/components/Login/Layout'

const LoginPage = ({
  currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : ''
}): ReactElement => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <FormProvider initialValues={{ email: '', password: '' }}>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  </ApolloProvider>
)

export default LoginPage
