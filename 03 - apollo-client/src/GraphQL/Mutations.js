import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation createUser($name: String!, $age: Int!, $married: Boolean!) {
        createUser(name: $name, age: $age, married: $married) {
            name
        }
    }
`