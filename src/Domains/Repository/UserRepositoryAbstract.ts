import RegisteredUser from "../Entities/Users/RegisteredUser"
import RegisterUser from "../Entities/Users/RegisterUser";
import UserLogedIn from "../Entities/Users/UserLogedIn"
import IUser from "../Entities/Users/Interface/UserInterface";


class UserRepositoryAbstract {
    async register(payload: RegisterUser): Promise<RegisteredUser> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async login(payload: Pick<IUser, 'username' | 'password'>): Promise<UserLogedIn> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async checkUserOnDatabase(username: string): Promise<boolean> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    }
}

export default UserRepositoryAbstract;