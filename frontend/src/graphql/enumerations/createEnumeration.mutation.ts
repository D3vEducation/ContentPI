// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation createEnumeration(
    $enumerationName: String!
    $identifier: String!
    $description: String!
    $values: String!
    $appId: UUID!
  ) {
    createEnumeration(
      input: {
        enumerationName: $enumerationName
        identifier: $identifier
        description: $description
        values: $values
        appId: $appId
      }
    ) {
      id
      appId
      enumerationName
      identifier
      description
      values
      createdAt
      updatedAt
    }
  }
`
