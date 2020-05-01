// Dependencies
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-fetch'

// Configuration
import config from '@config'

export default (): any => {
  const httpLink = new HttpLink({
    uri: config.api.uri,
    credentials: config.api.credentials,
    fetch
  })

  const cache = new InMemoryCache({
    dataIdFromObject: (object): any => object.id || null,
    addTypename: false
  })

  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([httpLink]),
    cache
  })

  return client
}
