// Dependencies
import gql from 'graphql-tag'

export default gql`
  mutation createValues($values: [CreateValueInput!]) {
    createValues(input: $values) {
      id
      entry
      value
    }
  }
`
