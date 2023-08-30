"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserLogedIn_1 = __importDefault(require("../UserLogedIn"));
/**
 * it should create user loged in instances with correct property
 */
describe('User Loged In', () => {
    it('it should create user loged in instances with correct property', () => {
        const payload = {
            id: 'user-123',
            name: 'ripan renaldi',
            token: 'SECRET ACCESS TOKEN',
            role: 'admin'
        };
        const credentialUser = new UserLogedIn_1.default(payload);
        expect(credentialUser).toHaveProperty('id');
        expect(credentialUser).toHaveProperty('name');
        expect(credentialUser).toHaveProperty('token');
        expect(credentialUser).toHaveProperty('role');
        expect(credentialUser.id).toBe(payload.id);
        expect(credentialUser.name).toBe(payload.name);
        expect(credentialUser.token).toBe(payload.token);
        expect(credentialUser.role).toBe(payload.role);
    });
    it('Should update data correctly using setter and getter', () => {
        const payload = {
            id: 'user-123',
            name: 'ripan renaldi',
            token: 'SECRET ACCESS TOKEN',
            role: 'admin'
        };
        const credentialUser = new UserLogedIn_1.default(payload);
        credentialUser.token = 'NEW ACCESS TOKEN';
        expect(credentialUser).toHaveProperty('id');
        expect(credentialUser).toHaveProperty('name');
        expect(credentialUser).toHaveProperty('token');
        expect(credentialUser.id).toBe(payload.id);
        expect(credentialUser.name).toBe(payload.name);
        expect(credentialUser.token).not.toBe(payload.token);
    });
});
