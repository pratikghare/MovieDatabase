"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const details_resolver_1 = require("./details-resolver");
exports.resolvers = (0, merge_1.mergeResolvers)([details_resolver_1.detailsResolver]);
