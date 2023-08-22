import InvariantError from "../../../Commons/Exceptions/InvariantError";
import IUser from "./Interface/UserInterface"
import UserLogedInSchema from "./schema/LogedInUserSchema";
export type UserLogedInType = Pick<IUser, 'role' | 'name'> & {
    id: string,
    token: string
}

class UserLogedIn implements UserLogedInType {
    private _name;
    private _role;
    private _id;
    private _token;

    constructor({ id, name, role, token }: UserLogedInType) {
        this.validate({id, name, role, token});
        this._id = id;
        this._name = name;
        this._token = token;
        this._role = role;
    }

    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get role(): string {
        return this._role;
    }
    get token(): string {
        return this._token;
    }
    set token(newToken: string) {
        this._token = newToken;
    }

    /* istanbul ignore next */
    validate(payload: UserLogedInType){
        const result = UserLogedInSchema.validate(payload);
        if(result.error){
            throw new InvariantError(result.error.message);
        }
    }

}

export default UserLogedIn;