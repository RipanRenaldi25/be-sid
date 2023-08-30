"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUser_1 = __importDefault(require("../../Entities/Users/RegisterUser"));
const UserRepositoryAbstract_1 = __importDefault(require("../UserRepositoryAbstract"));
/**
 * it should throw error when invoke function
 */
describe('User Repository Abstract', () => {
    it('it should throw error when invoke function', () => {
        const UserRepository = new UserRepositoryAbstract_1.default();
        expect(() => UserRepository.login({ username: 'ripanrenaldi', password: 'rahasia' })).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.register(new RegisterUser_1.default({ username: 'ripanrenaldi', password: 'rahasia', name: 'ripanrenaldi', role: 'admin', nik: '123123' }))).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.verifyAvailableUsername('asd')).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.checkUserOnDatabase('')).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.getUserByUsername('')).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.insertRefreshToken('asd', 'user-123')).rejects.toThrowError('USER_REPOSITORY.INSERT_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        expect(() => UserRepository.deleteUserTokenIfExists('asd')).rejects.toThrowError('USER_REPOSITORY.DELETE_USER_TOKEN_IF_EXISTS_METHOD_NOT_IMPLEMENTED');
    });
});
