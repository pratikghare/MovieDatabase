"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvedTMUrl = void 0;
exports.getThumbnail = getThumbnail;
exports.getImage = getImage;
exports.getBackdropImage = getBackdropImage;
const cryptr_1 = require("./cryptr");
const keys_utils_1 = require("./keys-utils");
const getResolvedTMUrl = (url, substitute, replacement, count = 1) => {
    const key = (0, cryptr_1.decrypt)((0, keys_utils_1.getTMKey)(count));
    url = url + key;
    for (let i = 0; i < substitute.length; i++)
        url = url.replace(substitute[i], replacement[i]);
    return url;
};
exports.getResolvedTMUrl = getResolvedTMUrl;
const IMAGE_NOT_FOUND = "";
const SHORT_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
const IMAGE_URL = `https://image.tmdb.org/t/p/original`;
function getThumbnail(item) {
    if ((item === null || item === void 0 ? void 0 : item.poster_path) != undefined)
        return SHORT_IMAGE_URL + item.poster_path;
    else if ((item === null || item === void 0 ? void 0 : item.profile_path) != undefined)
        return SHORT_IMAGE_URL + item.profile_path;
    else if ((item === null || item === void 0 ? void 0 : item.still_path) != undefined)
        return SHORT_IMAGE_URL + item.still_path;
    else if ((item === null || item === void 0 ? void 0 : item.file_path) != undefined)
        return SHORT_IMAGE_URL + item.file_path;
    return IMAGE_NOT_FOUND;
}
function getImage(item) {
    if ((item === null || item === void 0 ? void 0 : item.poster_path) != undefined)
        return IMAGE_URL + item.poster_path;
    else if ((item === null || item === void 0 ? void 0 : item.profile_path) != undefined)
        return IMAGE_URL + item.profile_path;
    else if ((item === null || item === void 0 ? void 0 : item.still_path) != undefined)
        return IMAGE_URL + item.still_path;
    else if ((item === null || item === void 0 ? void 0 : item.file_path) != undefined)
        return IMAGE_URL + item.file_path;
    return IMAGE_NOT_FOUND;
}
function getBackdropImage(item, inHD = true) {
    if ((item === null || item === void 0 ? void 0 : item.backdrop_path) != undefined)
        return (inHD ? IMAGE_URL : SHORT_IMAGE_URL) + item.backdrop_path;
    return null;
}
