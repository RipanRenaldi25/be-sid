"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../InvariantError"));
/**
 * it shuld throw an error with correct message
 * it should throw an error with statuscode when instantiate object
 */
describe('Invariant Error', () => {
    it('it shuld throw an error with correct message', () => {
        const error = new InvariantError_1.default('SOME ERROR MESSAGE', 422);
        expect(error.message).toBe('SOME ERROR MESSAGE');
    });
    it('it should throw an error with statuscode when instantiate object', () => {
        const error = new InvariantError_1.default('SOME ERROR MESSAGE', 400);
        expect(error.statusCode).toBe(400);
    });
    it('Should throw error with default statuscode', () => {
        const error = new InvariantError_1.default('SOME ERROR');
        expect(error.statusCode).toBe(422);
    });
});
