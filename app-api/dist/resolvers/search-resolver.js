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
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env/env");
const media_utils_1 = require("../media-utils");
const utils_1 = require("../utils");
const searchQuery = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { query }) {
    try {
        console.log('Search Query');
        const url = (0, utils_1.getResolvedTMUrl)(env_1.SEARCH, [env_1.SEARCH_DEL], [query]);
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch results: ${response.statusText}`);
        const result = yield response.json();
        const searchResults = (0, media_utils_1.getSearchResultsData)(result);
        return searchResults;
    }
    catch (error) {
        console.log("ERROR: ", error);
    }
});
const searchResolver = {
    Query: {
        searchQuery
    }
};
exports.default = searchResolver;
