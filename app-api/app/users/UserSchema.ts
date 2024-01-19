import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'User Schema',
    fields: ({
        email: {
            type: GraphQLString,
            resolve: (user) => user.email
        },
        password: {
            type: GraphQLString,
            resolve: (user) => user.password
        },
        firstName: {
            type: GraphQLString,
            resolve: (user) => user.first_name
        },
        lastName: {
            type: GraphQLString,
            resolve: (user) => user.last_name
        },
        phone: {
            type: GraphQLString,
            resolve: (user) => user.phone
        }
    })
})