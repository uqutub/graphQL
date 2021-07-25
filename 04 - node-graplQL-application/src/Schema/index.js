import { resolvers } from './Resolvers'
import { typeDefs } from './TypeDefs'
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export {
    resolvers,
    typeDefs,
    pubsub
}