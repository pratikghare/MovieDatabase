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
const utils_1 = require("../utils");
const media_utils_1 = require("../media-utils");
const context_1 = require("../context/context");
const env_1 = require("../env/env");
const Media = {
    __resolveType(obj) {
        switch (obj.mediaType) {
            case 'movie':
                return 'Movie';
            case 'tv':
                return 'TvShow';
            case 'person':
                return 'Person';
            default:
                return null;
        }
    }
};
const details = (_1, _a, context_2) => __awaiter(void 0, [_1, _a, context_2], void 0, function* (_, { id, media }, context) {
    var _b, _c, _d;
    try {
        const countryCode = ((_b = context === null || context === void 0 ? void 0 : context.location) === null || _b === void 0 ? void 0 : _b.country_code) ? context.location.country_code : env_1.DEFAULT_REGION;
        console.log('Details Query', context);
        let imdbId = "";
        if (media === context_1.MediaType.TV) {
            const id_response = yield fetch((0, utils_1.getResolvedTMExternalIdUrl)(id, media));
            imdbId = (yield id_response.json()).imdb_id;
        }
        const urls = (0, utils_1.getResolvedTMDetailsUrl)(id, media);
        if (imdbId)
            urls.push((0, utils_1.getResolvedOMUrl)(imdbId));
        const promises = urls.map((url) => fetch(url));
        const responses = yield Promise.all(promises);
        const data = yield Promise.all(responses.map((response) => response.json()));
        if (media === context_1.MediaType.MOVIE && data.length && ((_d = (_c = data[0]) === null || _c === void 0 ? void 0 : _c.imdb_id) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            data.push(yield (yield fetch((0, utils_1.getResolvedOMUrl)(data[0].imdb_id))).json());
        }
        // const data: any[] = media === MediaType.MOVIE ? movie : media === MediaType.PERSON ? person : tv;
        console.log(countryCode);
        const result = (0, media_utils_1.getMassagedMedia)(data, media, countryCode);
        return result;
    }
    catch (error) {
        console.log("ERROR: ", error);
    }
});
const mediaResolver = {
    Query: {
        details
    },
    Media
};
exports.default = mediaResolver;
