import CommonUserSchema from "./schema/UserSchema";
import User from "./Interface/AbstractUser";
import IUser from "./Interface/UserInterface";


class RegisterUser extends User {
    constructor({username, password, role, name, nik}: IUser){
        super({username, password, role, name, nik});
    }
}

export default RegisterUser;