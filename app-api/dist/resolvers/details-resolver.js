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
exports.detailsResolver = void 0;
const details_context_1 = require("../context/details-context");
const utils_1 = require("../utils");
const multi = "https://api.themoviedb.org/3/search/multi?query={query}&api_key=";
const searchQuery = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { query }) {
    console.log("HERE");
    try {
        const url = (0, utils_1.getResolvedTMUrl)(multi, ["{query}"], [query]);
        console.log(url);
        const response = yield fetch(url);
        // if(!response.ok) throw new Error(`Failed to fetch results: ${response.statusText}`);
        const jsonResponse = yield response.json();
        const results = jsonResponse.results;
        const massaged = [];
        results.forEach((item) => {
            massaged.push({
                id: item.id,
                mediaType: details_context_1.MediaType.PERSON,
                name: (item === null || item === void 0 ? void 0 : item.name) ? item.name : "",
                character: "",
                thumbnail: (0, utils_1.getThumbnail)(item),
                genre: [],
                rating: 0,
                gender: "",
                department: "",
                releaseDate: ""
            });
        });
        return massaged;
    }
    catch (error) {
        console.log(error);
    }
});
exports.detailsResolver = {
    Query: {
        searchQuery
    }
};
