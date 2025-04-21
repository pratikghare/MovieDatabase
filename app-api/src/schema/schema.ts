import { mergeTypeDefs } from "@graphql-tools/merge";
import mediaSchema from "./media-schema";
import { gql } from "apollo-server-express";

const schema = gql`
    type Query
`

export const typeDefs = mergeTypeDefs([schema, mediaSchema]);