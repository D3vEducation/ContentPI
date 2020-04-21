// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getUserData($at: String!) {
    getUserData(at: $at) {
      id
      email
      username
      privilege
      active
    }
  }
`
