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
const PasswordHash_1 = __importDefault(require("../../../Applications/Security/PasswordHash"));
const UnauthorizeError_1 = __importDefault(require("../../../Commons/Exceptions/UnauthorizeError"));
class PasswordHashConcrete extends PasswordHash_1.default {
    constructor(bcrypt, saltRound = 10) {
        super();
        this.bcrypt = bcrypt;
        this.saltRound = saltRound;
    }
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPassword = yield this.bcrypt.hash(password, this.saltRound);
            return newPassword;
        });
    }
    comparePassword(password, passwordHashed) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield this.bcrypt.compare(password, passwordHashed);
            if (!isMatch) {
                throw new UnauthorizeError_1.default('Username atau password salah');
            }
            return isMatch;
        });
    }
}
exports.default = PasswordHashConcrete;
