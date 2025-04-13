"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvedTMExternalIdUrl = exports.getResolvedOMUrl = exports.getResolvedTMDetailsUrl = exports.getResolvedTMUrl = void 0;
const context_1 = require("./context/context");
const cryptr_1 = require("./cryptr");
const env_1 = require("./env/env");
const keys_utils_1 = require("./keys-utils");
const getResolvedTMUrl = (url, substitute, replacement, count = 1) => {
    const key = (0, cryptr_1.decrypt)((0, keys_utils_1.getTMKey)(count));
    url = url + "api_key=" + key;
    for (let i = 0; i < substitute.length; i++)
        url = url.replace(substitute[i], replacement[i]);
    return url;
};
exports.getResolvedTMUrl = getResolvedTMUrl;
const getResolvedTMDetailsUrl = (id, media, season) => {
    let urls = [];
    const detail = media === context_1.MediaType.MOVIE ? env_1.MOVIE : media === context_1.MediaType.PERSON ? env_1.PERSON : media === context_1.MediaType.TV && season ? env_1.TV_SEASON : env_1.TV;
    urls = [detail.details, detail.credits, detail.images];
    if (media === context_1.MediaType.TV || media === context_1.MediaType.MOVIE)
        urls = [...urls, detail.videos, detail.similar, detail.recommendations];
    urls = urls.map((url) => (0, exports.getResolvedTMUrl)(url, [detail.delimiter], [id]));
    return urls;
};
exports.getResolvedTMDetailsUrl = getResolvedTMDetailsUrl;
const getResolvedOMUrl = (id) => {
    const key = (0, cryptr_1.decrypt)((0, keys_utils_1.getOMKey)(1));
    const url = env_1.OMDB_URL.replace(env_1.OMDB_DEL, id) + key;
    return url;
};
exports.getResolvedOMUrl = getResolvedOMUrl;
const getResolvedTMExternalIdUrl = (id, media) => {
    const detail = media === context_1.MediaType.MOVIE ? env_1.MOVIE : media === context_1.MediaType.PERSON ? env_1.PERSON : env_1.TV;
    return (0, exports.getResolvedTMUrl)(detail.externalIds, [detail.delimiter], [id]);
};
exports.getResolvedTMExternalIdUrl = getResolvedTMExternalIdUrl;
