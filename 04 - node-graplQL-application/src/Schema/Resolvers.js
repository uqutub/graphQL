import {users} from '../Mock_Data'
import { pubsub } from './index';

export const resolvers = {
    Query: {
        getAllUsers() {
            return users;
        }
    },
    Mutation: {
        createUser(parent, args) {
            const newUser = args;
            users.push(newUser);
            pubsub.publish('TRIGGER_NEW_USER', { newUser });
            return newUser
        },
        deleteUser(parent, args) {
            const deletedUser = users.find(({ name }) => name == args.name)
            console.log(deletedUser)
            return deletedUser
        }
    },
    Subscription: {
        newUser: {
            subscribe: () => pubsub.asyncIterator(['TRIGGER_NEW_USER'])
        }
    }

};