// Dependencies
import gql from 'graphql-tag'

export default gql`
  query getEnumerationsByAppId($appId: UUID!) {
    getEnumerationsByAppId(appId: $appId) {
      id
      enumerationName
      identifier
      values
      appId
    }
  }
`
