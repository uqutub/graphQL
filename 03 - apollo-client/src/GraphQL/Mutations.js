import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation createUser($n: String!, $a: Int!, $m: Boolean!) {
        createUser(name: $n, age: $a, married: $m) {
            name
        }
    }
`