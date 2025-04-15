"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("./resolvers/resolvers");
const schema_2 = require("./schema/schema");
const env_1 = require("./env/env");
const utils_1 = require("./utils");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.resolvers });
const server = new apollo_server_1.ApolloServer({
    schema,
    cors: { origin: "*", credentials: true },
    context: ({ req }) => {
        return (0, utils_1.fetchUserLocation)(req);
    },
});
server.listen({ port: env_1.PORT }).then(({ url }) => {
    console.log(`🚀 Server running on ${url}`);
});
