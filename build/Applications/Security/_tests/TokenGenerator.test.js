"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenGeneratorAbstract_1 = __importDefault(require("../TokenGeneratorAbstract"));
class TokenGeneratorConcrete extends TokenGeneratorAbstract_1.default {
    generateToken(payload, secretToken, expireInHour) {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.GENERATE_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    generateRefreshToken(payload, expireInHour, secretToken) {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.GENERATE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    checkExpireOfRefreshToken(refreshToken, secretToken) {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.CHECK_EXPIRE_OF_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
}
describe('Token Generator', () => {
    it('should throw an error when invoke method generateToken', () => {
        expect(() => new TokenGeneratorConcrete().generateToken({ id: 'asd', role: 'asd', username: 'asd' }, 'asd', 1)).toThrowError('TOKEN_GENERATOR_ABSTRACT.GENERATE_TOKEN_METHOD_NOT_IMPLEMENTED');
    });
    it('Should trow error when method generate refresh token invoke', () => {
        expect(() => new TokenGeneratorConcrete().generateRefreshToken({ id: 'asd', role: 'asd', username: 'asd' }, 3, 'asd')).toThrowError('TOKEN_GENERATOR_ABSTRACT.GENERATE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    });
    it('Should throw error when method checkExpireOfRefreshToken invoke', () => {
        expect(() => new TokenGeneratorConcrete().checkExpireOfRefreshToken('asd', 'asd')).toThrowError('TOKEN_GENERATOR_ABSTRACT.CHECK_EXPIRE_OF_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    });
});
