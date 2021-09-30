import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
    split
} from "@apollo/client"

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_URI,
    options: {
        reconnect: true,
        // connectionParams: {
        //     authToken: '<authToken>',
        // }
    }
});

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI
});

// https://www.apollographql.com/docs/react/data/error-handling/
const errorLink = onError(({ graphqlErrors, networkErrors }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert('GraphQL Error: ' + message);
        });
    }
    
    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkErrors) {
        console.log(`[Network error]: ${networkErrors}`);
    }
})

// The split function takes three parameters: (https://www.apollographql.com/docs/react/data/subscriptions/)
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, splitLink])
})

export {
    ApolloProvider,
    client
}