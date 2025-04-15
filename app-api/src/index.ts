import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/schema";
import { PORT } from "./env/env";
import { fetchUserLocation } from "./utils";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    schema,
    cors: { origin: "*", credentials: true },
    context: ({ req }) => {
        fetchUserLocation(req);
    },
});

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server running on ${url}`);
});
