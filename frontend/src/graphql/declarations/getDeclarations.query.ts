// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getDeclarations {
    getDeclarations {
      id
      icon
      declaration
      description
      color
    }
  }
`
