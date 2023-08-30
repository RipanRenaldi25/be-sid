"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnauthorizeError_1 = __importDefault(require("../UnauthorizeError"));
describe('Unauthorize Error', () => {
    it('Should have 401 status code', () => {
        const error = new UnauthorizeError_1.default('gagal');
        expect(error.statusCode).toBe(401);
    });
});
