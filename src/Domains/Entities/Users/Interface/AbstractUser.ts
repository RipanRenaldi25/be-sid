import IUser from "./UserInterface";
import UserSchema from "../schema/UserSchema";
import InvariantError from "../../../../Commons/Exceptions/InvariantError";

abstract class User implements IUser {
    protected _username: string;
    protected _password: string;
    protected _role: string;
    protected _name: string;
    protected _nik: string;
    

    constructor({username, password, role, name, nik}: IUser){
        this.validate({username, password, role, name, nik});
        this._username = username;
        this._password = password;
        this._role = role;
        this._name = name;
        this._nik = nik
    }

        /* istanbul ignore next */
    validate(payload: Partial<IUser>): void {
        const result = UserSchema.validate(payload);
        if(result.error){
            throw new InvariantError(result.error.message);
        }
    };

    get role(): string{
        return this._role;
    }

    set role(newRole: string) {
        this._role = newRole;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string){
        this._name = newName;
    }

    get username(): string {
        return this._username;
    }

    set username(newUsername: string) {
        this._username = newUsername;
    }

    get password():string {
        return this._password;
    }

    set password(newPassword) {
        this._password = newPassword;
    }

    get nik(): string{
        return this._nik;
    }

    set nik(newNik){
        this._nik = newNik;
    }



}

export default User;