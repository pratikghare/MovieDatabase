import { GraphQLList, GraphQLString } from "graphql";
import { UserType } from "./UserSchema";
import { query } from "../db";

export const userQuery = {
    name: 'UserQuery',
    description: 'This is an endpoint for User',
    type: GraphQLList(UserType),
    args: {
        email: { type: GraphQLString, description: 'User Email' },
        password: { type: GraphQLString, description: 'User Password' },
    },
    resolve: (parent, args) => {
        // console.log("PARENT == ", parent);
        const arr = [];
        if(args.email) arr.push(`email = '${args.email}'`);
        if(args.password) arr.push(`password = '${args.password}'`);

        let sqlQuery: string = `SELECT email, password, first_name, last_name, phone FROM Users${arr.length ? ` WHERE ${arr.join(' AND ')};` : ';'}`;
        return query(sqlQuery).then((result) => {
            // console.log("RESULT", result);
            return result[0];
        })
    }
}
