import CommonUserSchema from "./schema/UserSchema";
import User from "./Interface/AbstractUser";
import IUser from "./Interface/UserInterface";


class RegisterUser extends User {
    constructor({username, password, role, name}: IUser){
        super({username, password, role, name});
    }
}

export default RegisterUser;