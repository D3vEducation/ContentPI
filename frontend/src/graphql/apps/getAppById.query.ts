// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getAppById($id: UUID!) {
    getAppById(id: $id) {
      id
      appName
      icon
    }
  }
`
