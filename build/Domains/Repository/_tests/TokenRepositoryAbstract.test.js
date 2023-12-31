"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenRepositoryAbstract_1 = __importDefault(require("../TokenRepositoryAbstract"));
class TokenRepository extends TokenRepositoryAbstract_1.default {
    checkValidRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('TOKEN_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        });
    }
    deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('TOKEN_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        });
    }
}
describe('Token Repository Abstract', () => {
    it('Should throw error when invoke function', () => {
        expect(() => new TokenRepository().checkValidRefreshToken('asd')).rejects.toThrowError('TOKEN_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        expect(() => new TokenRepository().deleteRefreshToken('asd')).rejects.toThrowError('TOKEN_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    });
});
