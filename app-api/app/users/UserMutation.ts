import { GraphQLList, GraphQLString } from "graphql";
import { UserType } from "./UserSchema";
import { query } from "../db";
import { MutationType } from "../MutationSchema";


export const AddUser = {
    name: 'AddUser',
    description: 'This is an endpoint to Add User',
    type: MutationType,
    args: {
        email: { type: GraphQLString, description: 'User Email' },
        password: { type: GraphQLString, description: 'User Password' },
        firstName: { type: GraphQLString, description: 'User Password' },
        lastName: { type: GraphQLString, description: 'User Password' },
        phone: { type: GraphQLString, description: 'User Password' },
    },
    resolve: (parent, args) => {
        const arr = [];
        let sqlQuery: string = `CALL AddUser('${args.email}', '${args.password}', '${args.firstName}', '${args.lastName}', ${args.phone ? `'${args.phone}'` : 'NULL'});`;
        return query(sqlQuery).then((result) => {
            return result[0];
        })
    }
}


export const UpdatePassword = {
    name: 'UpdatePassword',
    description: 'This is an endpoint for Password Updation',
    type: MutationType,
    args: {
        email: { type: GraphQLString, description: 'User Email' },
        password: { type: GraphQLString, description: 'User Password' }
    },
    resolve: (parent, args) => {
        const arr = [];
        let sqlQuery: string = `CALL UpdatePassword('${args.email}', '${args.password}');`;
        return query(sqlQuery).then((result) => {
            return result[0];
        })
    }
}

