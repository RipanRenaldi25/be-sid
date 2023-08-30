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
const UserRepositoryConcrete_1 = __importDefault(require("../UserRepositoryConcrete"));
const DatabaseHelper_1 = __importDefault(require("../../../Commons/Helpers/DatabaseHelper"));
const RegisterUser_1 = __importDefault(require("../../../Domains/Entities/Users/RegisterUser"));
const PrismaClient_1 = __importDefault(require("../../Database/Prisma/PostgreSQL/PrismaClient"));
const InvariantError_1 = __importDefault(require("../../../Commons/Exceptions/InvariantError"));
const NotFoundError_1 = __importDefault(require("../../../Commons/Exceptions/NotFoundError"));
const UnauthorizeError_1 = __importDefault(require("../../../Commons/Exceptions/UnauthorizeError"));
const PasswordHash_1 = __importDefault(require("../../../Applications/Security/PasswordHash"));
/**
 * it should throw error when username is not available in database
 * Should not throw eror when username is not available in database
*/
class PasswordHash extends PasswordHash_1.default {
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
    comparePassword(password, passwordHashed) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
}
describe('User Repository Concrete', () => {
    let passwordService = new PasswordHash();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    it('should throw error when username is not available in database', () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        yield DatabaseHelper_1.default.cleanAllData();
        yield DatabaseHelper_1.default.createUser(userToRegister);
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => '098', passwordService });
        yield expect(() => userRepository.verifyAvailableUsername(payload.username)).rejects.toThrowError(InvariantError_1.default);
    }));
    it('Should not throw eror when username is not available in database', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'username tidak ada di database',
        };
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        yield expect(userRepository.verifyAvailableUsername(payload.username)).resolves.not.toThrowError(InvariantError_1.default);
    }));
    it('Should create new user on database', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldibaru',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '327328594023912'
        };
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => '321', passwordService });
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield userRepository.register(userToRegister);
        const findUser = yield DatabaseHelper_1.default.findUserById(user.id);
        expect(findUser).not.toBeUndefined();
        expect(findUser).toHaveProperty('nik');
    }));
    it('Should return registered user correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => '321', passwordService });
        const registeredUser = yield userRepository.register(userToRegister);
        expect(registeredUser.id).toBe('user-321');
        expect(registeredUser.name).toBe(payload.name);
        expect(registeredUser.username).toBe(payload.username);
        expect(registeredUser).toHaveProperty('id');
        expect(registeredUser).toHaveProperty('name');
        expect(registeredUser).toHaveProperty('username');
    }));
    it('Should throw when user is not found in database', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        yield expect(() => userRepository.checkUserOnDatabase(payload.username)).rejects.toThrowError(NotFoundError_1.default);
    }));
    it('Should return true when username is found', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'username',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield DatabaseHelper_1.default.createUser(userToRegister);
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        const isExists = yield userRepository.checkUserOnDatabase(user.username);
        expect(user).toBeDefined();
        expect(isExists).toBe(true);
    }));
    it('Should return user', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        yield DatabaseHelper_1.default.createUser(userToRegister);
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        const user = yield userRepository.getUserByUsername(payload.username);
        expect(user).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.username).toBe(payload.username);
        expect(user === null || user === void 0 ? void 0 : user.name).toBe(payload.name);
    }));
    it('should throw unauthorize error when username or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        yield DatabaseHelper_1.default.createUser(userToRegister);
        passwordService.comparePassword = jest.fn().mockImplementation(() => Promise.reject(new UnauthorizeError_1.default('asd')));
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        yield expect(() => userRepository.login({ username: payload.username, password: payload.password })).rejects.toThrowError(UnauthorizeError_1.default);
    }));
    it('Should not throw unauthorize error when username or password is correct', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        yield DatabaseHelper_1.default.createUser(userToRegister);
        passwordService.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true));
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        yield expect(userRepository.login(Object.assign({}, payload))).resolves.not.toThrowError(UnauthorizeError_1.default);
    }));
    it('Should insert token to database correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        const payload = {
            username: 'ripanrenaldi4',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield DatabaseHelper_1.default.createUser(userToRegister);
        yield userRepository.insertRefreshToken('asdsa', user.id);
        // get user by username
        const userOnDatabase = yield DatabaseHelper_1.default.findUserByUsername(user.username);
        expect(userOnDatabase.authentication.token).toBeDefined();
        expect(userOnDatabase.authentication.token).toBe('asdsa');
    }));
    it('Should throw error when insert token is failed because user is not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new UserRepositoryConcrete_1.default({ prisma: PrismaClient_1.default, idGenerator: () => { }, passwordService });
        yield expect(() => userRepository.insertRefreshToken('asd', 'user-not-found')).rejects.toThrowError(NotFoundError_1.default);
    }));
});
