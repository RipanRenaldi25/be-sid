"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenGeneratorConcrete_1 = __importDefault(require("../TokenGeneratorConcrete"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Token Generator Concrete', () => {
    it('Should be able to generate token correctly', () => {
        const payload = {
            id: 'asd',
            name: 'asd',
            role: 'asd',
            username: 'asd'
        };
        const tokenGenerator = new TokenGeneratorConcrete_1.default(jsonwebtoken_1.default);
        const token = tokenGenerator.generateToken(payload);
        const splitedToken = token.split('.');
        expect(splitedToken).toHaveLength(3);
        expect(token).toBeDefined();
    });
    it('Should be able to generate refresh token correctly', () => {
        const payload = {
            id: 'asd',
            name: 'asd',
            role: 'asd',
            username: 'asd'
        };
        const tokenGenerator = new TokenGeneratorConcrete_1.default(jsonwebtoken_1.default);
        const refreshToken = tokenGenerator.generateRefreshToken(payload, 3);
        const splitedToken = refreshToken.split('.');
        expect(splitedToken).toHaveLength(3);
        expect(refreshToken).toBeDefined();
    });
});
