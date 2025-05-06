import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './schema/schema';
import { PORT as port } from './env/env';
import { fetchUserLocation } from './utils';
import express from 'express';

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    schema,
    context: ({ req }) => fetchUserLocation(req),
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.get('/health', (_, res) => res.send('OK'));

    app.listen({ port }, () => {
        console.log(`🚀 Server running on http://localhost:${port}${server.graphqlPath}`);
    });
}

startServer();
