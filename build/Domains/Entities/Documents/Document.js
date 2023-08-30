"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentSchema_1 = __importDefault(require("./Schema/DocumentSchema"));
class Document {
    constructor(payload) {
        this.name = payload.name;
        this.kind = payload.kind;
        this.url = payload.url;
        this.created_at = payload.created_at;
    }
    _validate(payload) {
        const result = DocumentSchema_1.default.validate(payload);
        if (result.error) {
            throw new Error(result.error.message);
        }
    }
}
;
exports.default = Document;
