"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("./ClientError"));
class InvariantError extends ClientError_1.default {
    constructor(message, statusCode = 422) {
        super(message, statusCode);
        this.statusCode = statusCode;
    }
}
exports.default = InvariantError;
