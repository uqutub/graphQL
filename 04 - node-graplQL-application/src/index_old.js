import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema, typeDefs, resolvers } from './Schema';
import { isContext } from 'vm';

const PORT = process.env.PORT;
const app = express();

app.use('/graphql', bodyParser.json());


async function startApolloServer() {

  const pubsub = new PubSub();
  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub })
  });

  await apolloServer.start()
  apolloServer.applyMiddleware({ app });

  const server = createServer(app);

  server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: {typeDefs, resolvers},
    }, {
      server: server,
      path: '/subscriptions',
    });
  });

}



// async function startApolloServer() {

//   // const pubsub = new PubSub()

//   const server = new ApolloServer({
//     ...schema
//     // context: ({ req, res }) => ({ req, res, pubsub })
//   });
//   await server.start();

//   const app = express();

//   // Mount Apollo middleware here.
//   server.applyMiddleware({ app, path: '/specialUrl' });

//   await new Promise(resolve => app.listen({ port: 4000 }, resolve));

//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

//   return { server, app };
// }

startApolloServer();