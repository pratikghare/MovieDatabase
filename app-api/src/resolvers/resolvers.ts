import { mergeResolvers } from "@graphql-tools/merge";
import { detailsResolver } from "./details-resolver";

export const resolvers = mergeResolvers([detailsResolver]);