"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("./resolvers/resolvers");
const schema_2 = require("./schema/schema");
const env_1 = require("./env/env");
const utils_1 = require("./utils");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.resolvers });
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context: ({ req }) => (0, utils_1.fetchUserLocation)(req),
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        server.applyMiddleware({ app });
        app.get("/health", (_, res) => res.send("OK"));
        app.listen({ port: env_1.PORT }, () => {
            console.log(`🚀 Server running on http://localhost:${env_1.PORT}${server.graphqlPath}`);
        });
    });
}
startServer();
