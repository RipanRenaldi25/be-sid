"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const documentSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    url: joi_1.default.string().required(),
    kind: joi_1.default.string().required(),
    created_at: joi_1.default.string()
});
exports.default = documentSchema;
