"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisteredUser_1 = __importDefault(require("../RegisteredUser"));
/**
 * it should update props with getter and setter
 */
describe('Registered User', () => {
    it('it should update props with getter and setter', () => {
        const payload = {
            id: 'user-123',
            name: 'user ripan',
            username: 'ripanrenaldi',
        };
        const registeredUser = new RegisteredUser_1.default(payload);
        registeredUser.id = 'user-321';
        registeredUser.name = 'ripan';
        registeredUser.username = 'ripanrenaldi2';
        expect(registeredUser.id).not.toBe(payload.id);
        expect(registeredUser.name).not.toBe(payload.name);
        expect(registeredUser.username).not.toBe(payload.username);
    });
});
