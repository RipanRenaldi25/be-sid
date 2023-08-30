"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Utilities = {
    createToken(payload, expireInSeconds, secretToken) {
        return jsonwebtoken_1.default.sign(payload, secretToken, {
            expiresIn: expireInSeconds
        });
    },
    getFileNameAndExtension(fileName) {
        const splitedFile = fileName.split('.');
        const fileExtension = splitedFile[splitedFile.length - 1];
        const originalFileName = splitedFile.slice(0, splitedFile.length - 1);
        return [originalFileName, fileExtension];
    },
    getAccessToken(token) {
        const [, accessToken] = token.split(' ');
        return accessToken;
    }
};
exports.default = Utilities;
