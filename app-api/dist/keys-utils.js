"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOMKey = exports.getTMKey = exports.isAtleastADayDiff = exports.isAtleastAMonthDiff = void 0;
const keys_json_1 = __importDefault(require("./env/keys.json"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
const isAtleastAMonthDiff = (old) => {
    const oldDate = new Date(old);
    const currentDate = new Date();
    const yearDiff = currentDate.getFullYear() - oldDate.getFullYear();
    const monthDiff = currentDate.getMonth() - oldDate.getMonth();
    const totalMonthDiff = yearDiff * 12 + monthDiff;
    return totalMonthDiff >= 1;
};
exports.isAtleastAMonthDiff = isAtleastAMonthDiff;
const isAtleastADayDiff = (old) => {
    const now = Date.now();
    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const diffTime = Math.abs(now - old);
    const diffDays = Math.floor(diffTime / MS_IN_A_DAY);
    return diffDays >= 1;
};
exports.isAtleastADayDiff = isAtleastADayDiff;
const keys = [...keys_json_1.default];
const getKey = (count = 1, type, exclude) => {
    let key = null;
    keys.find((keyItem) => {
        var _a;
        const callback = keyItem.expiry === "monthly" ? exports.isAtleastAMonthDiff : exports.isAtleastADayDiff;
        if (exclude && !((_a = keyItem.excludes) === null || _a === void 0 ? void 0 : _a.find((exc) => exc === exclude)))
            keyItem.excludes.push(exclude);
        if (keyItem.type === type) {
            return keyItem.keys.find((item) => {
                if (callback(item.date)) {
                    key = item.key;
                    item.count = 0;
                    item.date = Date.now();
                    return item;
                }
                else if (keyItem.excludes.find((exc) => exc === item.key))
                    return;
                else if ((item.count + count) <= keyItem.limit || callback(item.date)) {
                    key = item.key;
                    item.count += count;
                    return item;
                }
            });
        }
    });
    const path = (0, path_1.resolve)(__dirname, "./env/keys.json");
    fs.writeFileSync(path, JSON.stringify(keys));
    return key ? key : "";
};
const getTMKey = (count = 1, exclude) => getKey(count, "TMDB", exclude);
exports.getTMKey = getTMKey;
const getOMKey = (count = 1, exclude) => getKey(count, "OMDB", exclude);
exports.getOMKey = getOMKey;
