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
class LoginUsecase {
    constructor({ userRepository, tokenGenerator }) {
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
    }
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = payload;
            yield this.userRepository.checkUserOnDatabase(username);
            yield this.userRepository.deleteUserTokenIfExists(username);
            yield this.userRepository.login({ username, password });
            const user = yield this.userRepository.getUserByUsername(username);
            const token = this.tokenGenerator.generateToken({
                id: user.id,
                role: user.role,
                username,
            }, process.env.SECRET_TOKEN || 'TOKEN_RAHASIA');
            const refreshToken = this.tokenGenerator.generateRefreshToken({
                id: user.id,
                role: user.role,
                username,
            }, 9, process.env.SECRET_REFRESH_TOKEN || 'REFRESH_TOKEN_RAHASIA');
            yield this.userRepository.insertRefreshToken(refreshToken, user.id);
            const returnedUser = {
                id: user.id,
                role: user.role,
                name: user.name,
                username,
                token,
                refreshToken
            };
            return returnedUser;
        });
    }
}
exports.default = LoginUsecase;
