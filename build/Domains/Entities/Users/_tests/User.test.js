"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUser_1 = __importDefault(require("../RegisterUser"));
/**
 * Should throw an error if password length < 6 character
 * Should throw an error if username length < 3 character
 * Should have correct property when instantiate object
 * Should invoke validate method when instantiate an object
 */
describe('Test', () => {
    it('Should throw an error if password length < 6 character', () => {
        expect(() => new RegisterUser_1.default({ username: 'asd', password: 'asd', role: 'user', name: 'ripan renaldi', nik: '123123' })).toThrowError();
    });
    it('Should throw an error if username length < 3 character', () => {
        expect(() => new RegisterUser_1.default({ username: 'a', password: 'asd', role: 'user', name: 'ripan renaldi', nik: '123123' })).toThrowError();
    });
    it('Should have correct property when instantiate object', () => {
        // arrange
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        expect(userToRegister).toHaveProperty('username');
        expect(userToRegister).toHaveProperty('password');
        expect(userToRegister).toHaveProperty('role');
        expect(userToRegister).toHaveProperty('name');
        expect(userToRegister.username).toBe(payload.username);
        expect(userToRegister.password).toBe(payload.password);
        expect(userToRegister.role).toBe(payload.role);
        expect(userToRegister.name).toBe(payload.name);
        expect(userToRegister.nik).toBe(payload.nik);
    });
    it('Should invoke validate method when instantiate an object', () => {
        // arrange
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        const spyValidateMethod = jest.spyOn(RegisterUser_1.default.prototype, 'validate');
        new RegisterUser_1.default(payload);
        expect(spyValidateMethod).toHaveBeenCalledTimes(1);
        expect(spyValidateMethod).toHaveBeenCalledWith(payload);
    });
    it('Should update private property correctly', () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        const newUser = new RegisterUser_1.default(payload);
        newUser.name = 'nama baru';
        newUser.password = 'password baru';
        newUser.role = 'role baru';
        newUser.username = 'username baru';
        newUser.nik = 'nik baru';
        expect(newUser.name).not.toBe(payload.name);
        expect(newUser.username).not.toBe(payload.username);
        expect(newUser.password).not.toBe(payload.password);
        expect(newUser.role).not.toBe(payload.role);
        expect(newUser.nik).not.toBe(payload.nik);
    });
});
