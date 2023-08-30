"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(100).required(),
    name: joi_1.default.string().required().min(2).max(100),
    password: joi_1.default.string().min(6).max(100).required(),
    role: joi_1.default.string().required(),
    nik: joi_1.default.string().required()
});
exports.default = UserSchema;
