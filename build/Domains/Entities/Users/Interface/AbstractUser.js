"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = __importDefault(require("../schema/UserSchema"));
const InvariantError_1 = __importDefault(require("../../../../Commons/Exceptions/InvariantError"));
class User {
    constructor({ username, password, role, name, nik }) {
        this.validate({ username, password, role, name, nik });
        this._username = username;
        this._password = password;
        this._role = role;
        this._name = name;
        this._nik = nik;
    }
    /* istanbul ignore next */
    validate(payload) {
        const result = UserSchema_1.default.validate(payload);
        if (result.error) {
            throw new InvariantError_1.default(result.error.message);
        }
    }
    ;
    get role() {
        return this._role;
    }
    set role(newRole) {
        this._role = newRole;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get username() {
        return this._username;
    }
    set username(newUsername) {
        this._username = newUsername;
    }
    get password() {
        return this._password;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
    get nik() {
        return this._nik;
    }
    set nik(newNik) {
        this._nik = newNik;
    }
}
exports.default = User;
