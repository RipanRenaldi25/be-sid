"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../../Commons/Exceptions/InvariantError"));
const LogedInUserSchema_1 = __importDefault(require("./schema/LogedInUserSchema"));
class UserLogedIn {
    constructor({ id, name, role, token }) {
        this.validate({ id, name, role, token });
        this._id = id;
        this._name = name;
        this._token = token;
        this._role = role;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get role() {
        return this._role;
    }
    get token() {
        return this._token;
    }
    set token(newToken) {
        this._token = newToken;
    }
    /* istanbul ignore next */
    validate(payload) {
        const result = LogedInUserSchema_1.default.validate(payload);
        if (result.error) {
            throw new InvariantError_1.default(result.error.message);
        }
    }
}
exports.default = UserLogedIn;
