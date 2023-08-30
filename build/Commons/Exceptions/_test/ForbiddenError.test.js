"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ForbiddenError_1 = __importDefault(require("../ForbiddenError"));
describe('Forbidden Error', () => {
    it('Should have status code 403', () => {
        const forbiddenError = new ForbiddenError_1.default('');
        expect(forbiddenError.statusCode).toBe(403);
    });
    it('Should throw with correct message', () => {
        const forbiddenError = new ForbiddenError_1.default('error');
        expect(forbiddenError.message).toBe('error');
    });
});
