"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGES = exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["PERSON"] = "person";
    MediaType["TV"] = "tv";
    MediaType["MOVIE"] = "movie";
})(MediaType || (exports.MediaType = MediaType = {}));
var PAGES;
(function (PAGES) {
    PAGES[PAGES["DETAILS"] = 0] = "DETAILS";
    PAGES[PAGES["HOME"] = 1] = "HOME";
    PAGES[PAGES["LOGIN"] = 2] = "LOGIN";
    PAGES[PAGES["REGISTER"] = 3] = "REGISTER";
    PAGES[PAGES["IMAGES"] = 4] = "IMAGES";
    PAGES[PAGES["IMAGE_VIEWER"] = 5] = "IMAGE_VIEWER";
    PAGES[PAGES["VIDEOS"] = 6] = "VIDEOS";
    PAGES[PAGES["CREDITS"] = 7] = "CREDITS";
    PAGES[PAGES["ADV_SEARCH"] = 8] = "ADV_SEARCH";
    PAGES[PAGES["SEASONS"] = 9] = "SEASONS";
})(PAGES || (exports.PAGES = PAGES = {}));
