"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenGeneratorAbstract_1 = __importDefault(require("../../../Applications/Security/TokenGeneratorAbstract"));
const ForbiddenError_1 = __importDefault(require("../../../Commons/Exceptions/ForbiddenError"));
class TokenGeneratorConcrete extends TokenGeneratorAbstract_1.default {
    constructor(jwt) {
        super();
        this.jwt = jwt;
        this.generateRefreshToken = this.generateRefreshToken.bind(this);
    }
    generateToken(payload, secretToken = 'TOKEN_RAHASIA', expireInHour) {
        let token;
        if (expireInHour) {
            token = this.jwt.sign(payload, secretToken, {
                expiresIn: 3600 * expireInHour
            });
            return token;
        }
        token = this.jwt.sign(payload, secretToken, {
            expiresIn: 3600 * 1
        });
        return token;
    }
    generateRefreshToken(payload, expiresInHour, secretToken = 'REFRESH_TOKEN_RAHASIA') {
        const refreshToken = this.generateToken(payload, secretToken, expiresInHour);
        return refreshToken;
    }
    checkExpireOfRefreshToken(refreshToken, secretToken) {
        try {
            this.jwt.verify(refreshToken, secretToken);
        }
        catch (err) {
            throw new ForbiddenError_1.default(err.message);
        }
    }
}
exports.default = TokenGeneratorConcrete;
