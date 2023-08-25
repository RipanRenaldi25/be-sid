import IUser from "./Interface/UserInterface";
import User from "./Interface/AbstractUser";
import RegisteredUserSchema from "./schema/RegisteredUserSchema";
import InvariantError from "../../../Commons/Exceptions/InvariantError";

export type RegisteredUserType =  Omit<IUser, 'password' | 'role' | 'nik'> & {
    id: string
}

class RegisteredUser implements RegisteredUserType {
    private _id;
    private _username;
    private _name;
    public role?: string

    constructor({id, username, name}: RegisteredUserType) {
        this._id = id;
        this._username = username;
        this._name = name;
    };

    get id():string {
        return this._id;
    };

    set id(newId: string) {
        this._id = newId;
    };

    get username():string {
        return this._username;
    }

    set username(newUsername: string) {
        this._username = newUsername;
    }

    get name(): string {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    /* istanbul ignore next */
    validate(payload: RegisteredUserType) {
        const result = RegisteredUserSchema.validate(payload);
        if(result.error){
            throw new InvariantError(result.error.message);
        }
    }
}

export default RegisteredUser;