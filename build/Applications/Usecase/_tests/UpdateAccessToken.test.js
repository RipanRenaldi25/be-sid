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
const TokenRepositoryAbstract_1 = __importDefault(require("../../../Domains/Repository/TokenRepositoryAbstract"));
const TokenGeneratorAbstract_1 = __importDefault(require("../../Security/TokenGeneratorAbstract"));
const UpdateAccessToken_1 = __importDefault(require("../UpdateAccessToken"));
/**
 * test case
 * it should be able to orhcestrate usecase correctly
 */
class TokenRepositoryConcrete extends TokenRepositoryAbstract_1.default {
    checkValidRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
    deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
}
class TokenGeneratorConcrete extends TokenGeneratorAbstract_1.default {
    generateToken(payload, secretToken, expireInHour) {
        throw new Error();
    }
    generateRefreshToken(payload, expireInHour, secretToken) {
        throw new Error();
    }
    checkExpireOfRefreshToken(refreshToken) {
        throw new Error();
    }
}
describe('UpdateAccessTokenUseCase', () => {
    it('it should be able to orhcestrate usecase correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const refreshToken = 'asd.dsa.32ass';
        const mockNewAccessToken = 'asda.dsaa.32assa';
        const newPayloadUser = {
            id: 'user-asdsa',
            name: 'nama saya',
            role: 'user',
            username: 'ripanrenaldi'
        };
        const tokenRepository = new TokenRepositoryConcrete();
        const tokenGenerator = new TokenGeneratorConcrete();
        const updateAccessTokenUseCase = new UpdateAccessToken_1.default({
            tokenRepository,
            tokenGenerator
        });
        tokenRepository.checkValidRefreshToken = jest.fn().mockImplementation(() => Promise.resolve(newPayloadUser));
        tokenGenerator.generateToken = jest.fn().mockImplementation(() => Promise.resolve(mockNewAccessToken));
        tokenGenerator.checkExpireOfRefreshToken = jest.fn().mockImplementation(() => Promise.resolve(refreshToken));
        const newToken = yield updateAccessTokenUseCase.execute(refreshToken);
        const splitedNewToken = newToken.split('.');
        expect(newToken).toBeDefined();
        expect(splitedNewToken).toHaveLength(3);
        expect(tokenRepository.checkValidRefreshToken).toHaveBeenCalledWith(refreshToken);
        expect(tokenGenerator.generateToken).toHaveBeenCalledWith(newPayloadUser, 'TOKEN_RAHASIA', 1);
        expect(tokenGenerator.checkExpireOfRefreshToken).toHaveBeenCalledWith(refreshToken, 'SECRET_TOKEN_RAHASIA');
    }));
});
