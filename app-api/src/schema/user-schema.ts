import { gql } from "apollo-server-express";

export const userSchema = gql`
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