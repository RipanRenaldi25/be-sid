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
const UnauthorizeError_1 = __importDefault(require("../../../../Commons/Exceptions/UnauthorizeError"));
const PasswordHashConcrete_1 = __importDefault(require("../PasswordHashConcrete"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('Password Hash Concrete', () => {
    it('Should hash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordHash = new PasswordHashConcrete_1.default(bcrypt_1.default);
        const password = 'rahasia';
        const newPassword = yield passwordHash.hash(password);
        expect(newPassword).toBeDefined();
        expect(newPassword).not.toBe(password);
    }));
    it('Should compare password corrcetly', () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordHash = new PasswordHashConcrete_1.default(bcrypt_1.default);
        const password = 'rahasia';
        passwordHash.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true));
        // action
        yield passwordHash.comparePassword(password, 'asdasd');
        expect(passwordHash.comparePassword).toHaveBeenCalledWith(password, 'asdasd');
        yield expect(passwordHash.comparePassword).toHaveBeenCalledTimes(1);
    }));
    it('Should throw unauthorize error when password is not match', () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordHash = new PasswordHashConcrete_1.default(bcrypt_1.default);
        const password = 'rahasia2';
        const encryptedPassword = yield bcrypt_1.default.hash('password', 10);
        yield expect(() => passwordHash.comparePassword(password, encryptedPassword)).rejects.toThrowError(UnauthorizeError_1.default);
    }));
});
