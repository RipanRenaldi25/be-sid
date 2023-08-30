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
const PasswordHash_1 = __importDefault(require("../PasswordHash"));
class PasswordHash extends PasswordHash_1.default {
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
        });
    }
    comparePassword(password, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
        });
    }
}
describe('Password Hash Abstract', () => {
    it('Should throw error when invoke method hash', () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordHash = new PasswordHash();
        expect(() => passwordHash.hash('asd')).rejects.toThrowError('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }));
    it('Should throw error when invoke method compare', () => {
        const passwordHash = new PasswordHash();
        expect(() => passwordHash.comparePassword('asd', 'kajsdkas')).rejects.toThrowError('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    });
});
