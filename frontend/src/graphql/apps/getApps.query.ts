// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getApps {
    getApps {
      id
      appName
      identifier
      description
      icon
    }
  }
`
