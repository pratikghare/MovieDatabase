"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const details_schema_1 = require("./details-schema");
const user_schema_1 = require("./user-schema");
const apollo_server_1 = require("apollo-server");
const schema = (0, apollo_server_1.gql) `
    type Query
    type Mutation
`;
exports.typeDefs = (0, merge_1.mergeTypeDefs)([schema, user_schema_1.userSchema, details_schema_1.detailsSchema]);
