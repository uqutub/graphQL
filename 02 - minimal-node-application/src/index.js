import 'dotenv/config';     // for getting .env file
import 'cross-fetch/polyfill'   // dependency apolo-boost
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',      // Github GraphQL Server
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN_ACCESS}`
      }
    });
  }
});


// React => Axios => Github gql
// Node => Apollo-boost => Github gql

// const GET_ORG_DETAILS = gql`
//   query {
//     organization(login: "qutbITech") {
//       name
//       id
//     }
//   }
// `;

// // POST
// client.query({
//   query: GET_ORG_DETAILS
// }).then(res => console.log('GET_ORG_DETAILS >>>', res));


// Data Scraping
// AI

// Server => Request (daraz => Mobile Price) => Database  ???? (Client/React)

// React => Server => (Database) => Response Client (UI)



// // Query with Variables

// const GET_ORG_DETAILS_VARIABLE = gql`
//   query getOrganization($org: String!, $org2: String!){
//     org1: organization(login: $org) {
//       name
//       url
//       description
//     }
//     org2: organization(login: $org2) {
//       name
//       url
//       description
//     }
//   }
// `;

// client.query({
//   query: GET_ORG_DETAILS_VARIABLE,
//   variables: {
//     org: "qutbITech",
//     org2: "facebook"
//   }
// })
// .then(res => console.log('GET_ORG_DETAILS_VARIABLE >>>', res))
// .catch(err => console.log('Err: ', err));




// // MUTATION

const ADD_STAR = gql`
  mutation AddStartToMyRepo($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`

client.mutate({
  mutation: ADD_STAR,
  variables: {
    repoId: "MDEwOlJlcG9zaXRvcnkzODc1MTIzNjA="
  }
})
  .then(d => console.log(JSON.stringify(d)))
  .catch(err => console.log('Err: ', err));
