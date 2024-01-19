import * as devEnv from '../environment/environment.dev';
import * as prodEnv from '../environment/environment';
export const env = devEnv.env;

import express from 'express';
import { graphqlHTTP } from 'express-graphql'; 

import { connection } from './db';
import { schema } from './schema';

connection.then((conn) => {
    console.log(':::: Database Connected ::::');
    return conn;
})

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(env.PORT, () => console.log(`Server running on http://localhost:${env.PORT}/`));

