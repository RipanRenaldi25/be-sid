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
const ServicesContainer_1 = __importDefault(require("../../Infrastructures/Container/ServicesContainer"));
const UpdateAccessToken_1 = __importDefault(require("../../Applications/Usecase/UpdateAccessToken"));
const ClientError_1 = __importDefault(require("../../Commons/Exceptions/ClientError"));
const TokenRepositoryConcrete_1 = __importDefault(require("../../Infrastructures/Repository/TokenRepositoryConcrete"));
class AuthenticationController {
    static updateRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const updateAccessTokenUsecase = ServicesContainer_1.default.getInstance(UpdateAccessToken_1.default.name);
                const newToken = yield updateAccessTokenUsecase.execute(refreshToken);
                res.status(200).json({
                    status: 'success',
                    message: 'Refresh token updated',
                    accessToken: newToken
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                    return;
                }
                res.status(500).json({
                    status: 'fail',
                    message: `Server error ${err.message}`
                });
            }
        });
    }
    static deleteRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.params;
                console.log({ refreshToken });
                const tokenRepository = ServicesContainer_1.default.getInstance(TokenRepositoryConcrete_1.default.name);
                yield tokenRepository.deleteRefreshToken(refreshToken);
                res.status(200).json({
                    status: 'success',
                    message: 'Logout success'
                });
            }
            catch (e) {
                if (e instanceof ClientError_1.default) {
                    res.status(e.statusCode).json({
                        status: 'fail',
                        message: e.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `error ${e.message}`
                    });
                }
            }
        });
    }
}
exports.default = AuthenticationController;
