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
const LoginUsecase_1 = __importDefault(require("../LoginUsecase"));
const UserRepositoryAbstract_1 = __importDefault(require("../../../Domains/Repository/UserRepositoryAbstract"));
const TokenGeneratorAbstract_1 = __importDefault(require("../../Security/TokenGeneratorAbstract"));
const RegisteredUser_1 = __importDefault(require("../../../Domains/Entities/Users/RegisteredUser"));
class TokenGeneratorConcrete extends TokenGeneratorAbstract_1.default {
    generateToken() {
        return '123';
    }
    generateRefreshToken(payload, expireInHour, secretToken) {
        return 'asd';
    }
    checkExpireOfRefreshToken(refreshToken) {
        throw new Error();
    }
}
describe('Login Use Case', () => {
    it('Should orchestrate correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        const secretToken = 'TOKEN_RAHASIA';
        const payload = {
            username: 'ripanrenaldi25',
            password: 'rahasia'
        };
        const mockRegisteredUser = new RegisteredUser_1.default({
            id: 'user-123',
            name: 'ripan renaldi',
            username: payload.username
        });
        mockRegisteredUser.role = 'user';
        const userRepository = new UserRepositoryAbstract_1.default();
        const tokenGenerator = new TokenGeneratorConcrete();
        const LoginUsecase = new LoginUsecase_1.default({ userRepository, tokenGenerator });
        // mock function
        userRepository.checkUserOnDatabase = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.insertRefreshToken = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.login = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.getUserByUsername = jest.fn().mockImplementation(() => Promise.resolve({
            id: mockRegisteredUser.id,
            name: mockRegisteredUser.name,
            username: mockRegisteredUser.username,
            role: mockRegisteredUser.role,
        }));
        userRepository.deleteUserTokenIfExists = jest.fn().mockImplementation(() => Promise.resolve(true));
        tokenGenerator.generateToken = jest.fn().mockImplementation(() => '123123');
        tokenGenerator.generateRefreshToken = jest.fn().mockImplementation(() => 'REFRESH_TOKEN');
        const userLogedIn = yield LoginUsecase.execute(payload);
        expect(userRepository.checkUserOnDatabase).toHaveBeenCalledWith(payload.username);
        expect(userRepository.insertRefreshToken).toHaveBeenCalledWith('REFRESH_TOKEN', mockRegisteredUser.id);
        expect(userRepository.login).toHaveBeenCalledWith(payload);
        expect(tokenGenerator.generateToken).toHaveBeenCalledWith({
            id: 'user-123',
            username: payload.username,
            role: mockRegisteredUser.role
        }, secretToken);
        expect(userLogedIn).toEqual({
            id: mockRegisteredUser.id,
            name: mockRegisteredUser.name,
            role: mockRegisteredUser.role,
            username: payload.username,
            token: '123123',
            refreshToken: 'REFRESH_TOKEN'
        });
    }));
});
