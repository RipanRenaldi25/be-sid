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
const TokenRepositoryAbstract_1 = __importDefault(require("../../Domains/Repository/TokenRepositoryAbstract"));
const NotFoundError_1 = __importDefault(require("../../Commons/Exceptions/NotFoundError"));
class TokenRepositoryConcrete extends TokenRepositoryAbstract_1.default {
    constructor({ prisma }) {
        super();
        this.prisma = prisma;
    }
    ;
    checkValidRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.authentication.findUnique({
                where: {
                    token: refreshToken
                },
                include: {
                    user: true
                }
            });
            if (!user) {
                throw new NotFoundError_1.default('Refresh token salah');
            }
            return {
                id: user.user.id,
                name: user.user.name,
                role: user.user.role,
                username: user.user.username
            };
        });
    }
    deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.authentication.delete({
                where: {
                    token: refreshToken
                }
            });
        });
    }
}
exports.default = TokenRepositoryConcrete;
