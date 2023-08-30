"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractUser_1 = __importDefault(require("./Interface/AbstractUser"));
class RegisterUser extends AbstractUser_1.default {
    constructor({ username, password, role, name, nik }) {
        super({ username, password, role, name, nik });
    }
}
exports.default = RegisterUser;
