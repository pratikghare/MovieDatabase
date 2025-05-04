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
exports.getResolvedSeasonUrl = exports.fetchUserLocation = exports.getResolvedTMExternalIdUrl = exports.getResolvedOMUrl = exports.getResolvedTMDetailsUrl = exports.getResolvedTMUrl = void 0;
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
        urls = [...urls, detail.videos, detail.similar, detail.recommendations, detail.watchProviders, detail.reviews];
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
const getResolvedIpInfoUrl = (ip) => `https://api.ipinfo.io/lite/${ip}?token=` + (0, cryptr_1.decrypt)((0, keys_utils_1.getIPInfoKey)(1));
const fetchUserLocation = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ip = ((_a = request.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.toString().split(",")[0]) ||
        request.socket.remoteAddress ||
        null;
    console.log("Incoming request from IP: ", ip);
    try {
        // const res = await fetch(`http://ip-api.com/json/${ip}`);
        const res = yield fetch(getResolvedIpInfoUrl(ip));
        const location = yield res.json();
        // console.log("Location Info User:", location);
        return { ip, location };
    }
    catch (error) {
        console.error("Error fetching location:", error);
        return { ip, location: null };
    }
});
exports.fetchUserLocation = fetchUserLocation;
const getResolvedSeasonUrl = (id, seasonNumber, media) => {
    const delimeters = [env_1.TV.delimiter, env_1.TV_SEASON.delimiter];
    const values = [id, seasonNumber.toString()];
    const url = [
        (0, exports.getResolvedTMUrl)(env_1.TV_SEASON.details, delimeters, values),
        (0, exports.getResolvedTMUrl)(env_1.TV_SEASON.credits, delimeters, values)
    ];
    return url;
};
exports.getResolvedSeasonUrl = getResolvedSeasonUrl;
