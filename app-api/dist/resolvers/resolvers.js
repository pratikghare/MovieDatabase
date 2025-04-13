"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const media_resolver_1 = __importDefault(require("./media-resolver"));
const search_resolver_1 = __importDefault(require("./search-resolver"));
exports.resolvers = (0, merge_1.mergeResolvers)([media_resolver_1.default, search_resolver_1.default]);
