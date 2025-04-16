"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const media_schema_1 = __importDefault(require("./media-schema"));
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
    type Query
`;
exports.typeDefs = (0, merge_1.mergeTypeDefs)([schema, media_schema_1.default]);
