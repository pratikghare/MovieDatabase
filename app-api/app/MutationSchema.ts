import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'This is a Schema for Mutation Queries',
    fields: ({
        responseCode: {
            type: GraphQLInt,
            resolve: (mutation) => mutation.response_code
        },
        alertMessage: {
            type: GraphQLString,
            resolve: (mutation) => mutation.alert_message
        }
    })
});