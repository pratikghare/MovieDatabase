import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import { env } from "process";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/schema";
const PORT = 1234;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Start Apollo Server
const server = new ApolloServer({ schema, cors: { origin: "*", credentials: true } });

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server running on ${url}`);
});
