"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisteredUserSchema_1 = __importDefault(require("./schema/RegisteredUserSchema"));
const InvariantError_1 = __importDefault(require("../../../Commons/Exceptions/InvariantError"));
class RegisteredUser {
    constructor({ id, username, name }) {
        this._id = id;
        this._username = username;
        this._name = name;
    }
    ;
    get id() {
        return this._id;
    }
    ;
    set id(newId) {
        this._id = newId;
    }
    ;
    get username() {
        return this._username;
    }
    set username(newUsername) {
        this._username = newUsername;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    /* istanbul ignore next */
    validate(payload) {
        const result = RegisteredUserSchema_1.default.validate(payload);
        if (result.error) {
            throw new InvariantError_1.default(result.error.message);
        }
    }
}
exports.default = RegisteredUser;
