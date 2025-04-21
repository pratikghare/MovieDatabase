import { mergeResolvers } from "@graphql-tools/merge";
import mediaResolver from "./media-resolver";
import searchResolver from "./search-resolver";

export const resolvers = mergeResolvers([mediaResolver, searchResolver]);