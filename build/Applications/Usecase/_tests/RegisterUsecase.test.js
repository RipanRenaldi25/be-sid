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
const RegisterUser_1 = __importDefault(require("../../../Domains/Entities/Users/RegisterUser"));
const RegisteredUser_1 = __importDefault(require("../../../Domains/Entities/Users/RegisteredUser"));
const UserRepositoryAbstract_1 = __importDefault(require("../../../Domains/Repository/UserRepositoryAbstract"));
const PasswordHash_1 = __importDefault(require("../../Security/PasswordHash"));
const RegisterUsecase_1 = __importDefault(require("../RegisterUsecase"));
// extends class just to make sure that Password hash can be mocked soon
class PasswordHash extends PasswordHash_1.default {
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
}
describe('Register Use Case', () => {
    it('Should orchestrate correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            name: 'ripan renaldi',
            password: 'rahasia',
            role: 'admin',
            username: 'ripanrenaldi',
            nik: '123123'
        };
        const mockUserToRegister = new RegisterUser_1.default(Object.assign(Object.assign({}, payload), { password: 'encrypted password' }));
        const mockRegisteredUser = new RegisteredUser_1.default({
            id: 'user-123',
            name: payload.name,
            username: payload.username
        });
        // mock function
        const userRepository = new UserRepositoryAbstract_1.default();
        const passwordHash = new PasswordHash();
        userRepository.verifyAvailableUsername = jest.fn().mockImplementation(() => Promise.resolve);
        passwordHash.hash = jest.fn().mockImplementation(() => 'encrypted password');
        userRepository.register = jest.fn().mockImplementation(() => Promise.resolve(mockRegisteredUser));
        // create register usecase instances
        const registerUseCase = new RegisterUsecase_1.default({
            userRepository,
            passwordHash
        });
        const registeredUser = yield registerUseCase.execute(payload);
        expect(userRepository.verifyAvailableUsername).toHaveBeenCalledWith(payload.username);
        expect(passwordHash.hash).toHaveBeenCalledWith(payload.password);
        expect(userRepository.register).toHaveBeenCalledWith(mockUserToRegister);
        expect(registeredUser).toStrictEqual(mockRegisteredUser);
    }));
});
