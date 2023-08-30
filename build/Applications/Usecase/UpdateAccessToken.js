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
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateAccessTokenUseCase {
    constructor({ tokenGenerator, tokenRepository }) {
        this.tokenGenerator = tokenGenerator;
        this.tokenRepository = tokenRepository;
    }
    execute(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.tokenRepository.checkValidRefreshToken(refreshToken);
            this.tokenGenerator.checkExpireOfRefreshToken(refreshToken, process.env.SECRET_REFRESH_TOKEN || 'SECRET_TOKEN_RAHASIA');
            const newAccessToken = this.tokenGenerator.generateToken(payload, process.env.SECRET_TOKEN || 'TOKEN_RAHASIA', 1);
            return newAccessToken;
        });
    }
}
exports.default = UpdateAccessTokenUseCase;
