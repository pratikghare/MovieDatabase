import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/schema";
import { PORT } from "./env/env";
import fs from "fs";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  cors: { origin: "*", credentials: true },
  context: ({ req }) => {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] || // if behind proxy
      req.socket.remoteAddress ||                                // regular IP
      null;

    console.log("Incoming request from IP:", ip);
    return { ip };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server running on ${url}`);
});
