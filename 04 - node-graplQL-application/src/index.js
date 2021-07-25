import { createServer } from "http";
import express from "express";
import { execute, subscribe } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";

import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from './Schema'

const PORT = 4000;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

(async () => {
    
    await server.start();
    server.applyMiddleware({ app });

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    );

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        );
    });

})();



// My Rest APIs (-SAMPLE-) :)
app.get('/', (req, res)=> {
    // Endpoint: http://localhost:4000/
    res.json({
        graphQL: `http://localhost:${PORT}${server.graphqlPath}`,
        subscription: `ws://localhost:${PORT}${server.graphqlPath}`
    })
})

app.get('/github/:name', (req, res)=> {
    // Endpoint: http://localhost:4000/github/uqutub
    res.json({
        username: req.params.name,
        githutb: `https://api.github.com/users/${req.params.name}`,
    })
})

app.get('/queryString', (req, res)=> {
    // Endpoint: http://localhost:4000/queryString?name=uqutub&email=usuf52@gmail.com
    res.json(req.query)
})
