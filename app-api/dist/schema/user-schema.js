"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userSchema = (0, apollo_server_express_1.gql) `
    type User {
        userId: ID!
        emailId: String!
        password: String!
        name: String!
        initials: String!
        phone: String
        image: String
    }

    type AuthPayload {
        user: User
        token: String
    }
    
    extend type Query {
        loginUser(userId: String!, password: String!): AuthPayload
        getLoggedInUser(token: String): AuthPayload
        checkUser(userId: String, emailId: String): Boolean!
    }

    extend type Mutation {
        updateUser(userId: String!, emailId: String, password: String, name: String, initials: String, phone: String): Boolean!
        updatePicture(userId: String, image: String): Boolean!
        registerUser(userId: String!, emailId: String!, password: String!, name: String!, initials: String!): Boolean!
    }
`;
