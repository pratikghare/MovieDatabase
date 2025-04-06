import { mergeTypeDefs } from "@graphql-tools/merge";
import { detailsSchema } from "./details-schema";
import { userSchema } from "./user-schema";
import { gql } from "apollo-server";

const schema = gql`
    type Query
    type Mutation
`

export const typeDefs = mergeTypeDefs([schema, userSchema, detailsSchema]);