"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("@graphql-tools/schema");
// import { env } from "process";
const resolvers_1 = require("./resolvers/resolvers");
const schema_2 = require("./schema/schema");
const PORT = 1234;
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.resolvers });
// Start Apollo Server
const server = new apollo_server_1.ApolloServer({ schema, cors: { origin: "*", credentials: true } });
server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server running on ${url}`);
});
