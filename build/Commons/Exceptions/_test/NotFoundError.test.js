"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../NotFoundError"));
describe('Not found error', () => {
    it('Should return 404', () => {
        const notFoundError = new NotFoundError_1.default('Tidak ditemukan');
        expect(notFoundError.statusCode).toBe(404);
    });
});
