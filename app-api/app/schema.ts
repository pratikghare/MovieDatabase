import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQuery } from "./users/UserQuery";


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'This is the root for all queries',
    fields: ({
        userQuery
    })
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'This is the root for all mutations',
    fields: ({

    })
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})

