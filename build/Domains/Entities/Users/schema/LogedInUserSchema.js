"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UserLogedInSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().min(3).max(100).required(),
    token: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
});
exports.default = UserLogedInSchema;
