"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.decrypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default("In a world where everyone shows and tells everthing.... I value discretion and privacy!!");
const decrypt = (encrypted) => cryptr.decrypt(encrypted);
exports.decrypt = decrypt;
const encrypt = (value) => cryptr.encrypt(value);
exports.encrypt = encrypt;
