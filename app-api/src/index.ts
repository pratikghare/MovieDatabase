// import { ApolloServer } from "apollo-server";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { resolvers } from "./resolvers/resolvers.export";
// import { typeDefs } from "./schema/schema.export";
// import env from "./env/env";

// // Create schema
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// // Start Apollo Server
// const server = new ApolloServer({ schema, cors: { origin: "*", credentials: true } });

// server.listen({ port: env.PORT, host: "0.0.0.0" }).then(({ url }) => {
//   console.log(`🚀 Server running on ${url}`);
// });
