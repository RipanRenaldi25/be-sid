import RegisteredUser from "../Entities/Users/RegisteredUser"
import RegisterUser from "../Entities/Users/RegisterUser";
import UserLogedIn from "../Entities/Users/UserLogedIn"
import IUser from "../Entities/Users/Interface/UserInterface";

export type UserWithRoleType = ({
    userRole: {
        role: string;
    };
} & {
    id: string;
    name: string;
    username: string;
    nik: string;
    role: string;
    password: string;
})
class UserRepositoryAbstract {
    async register(payload: RegisterUser): Promise<RegisteredUser> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async login(payload: Pick<IUser, 'username' | 'password'>): Promise<any> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    };
    async checkUserOnDatabase(username: string): Promise<boolean> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    }
    async getUserByUsername(username: string): Promise<UserWithRoleType | null> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }
    async insertRefreshToken(token: string, userId: string): Promise<void>{
        throw new Error('USER_REPOSITORY.INSERT_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    async deleteUserTokenIfExists (username: string): Promise<boolean> {
        throw new Error('USER_REPOSITORY.DELETE_USER_TOKEN_IF_EXISTS_METHOD_NOT_IMPLEMENTED');
    }
    
}

export default UserRepositoryAbstract;