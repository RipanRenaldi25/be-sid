import RegisterUser from "../../Domains/Entities/Users/RegisterUser";
import RegisteredUser from "../../Domains/Entities/Users/RegisteredUser";
import UserRepositoryAbstract from "../../Domains/Repository/UserRepositoryAbstract";
import PasswordHashAbstract from "../Security/PasswordHash";
import RegisterUseCase from '../RegisterUsecase';
import IUser from "../../Domains/Entities/Users/Interface/UserInterface";

// extends class just to make sure that Password hash can be mocked soon
class PasswordHash extends PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error();
    }
}

describe('Register Use Case', () => {
    it('Should orchestrate correctly', async () => {
        const payload: IUser = {
            name: 'ripan renaldi',
            password: 'rahasia',
            role: 'admin',
            username: 'ripanrenaldi',
            nik: '123123'
        };

        const mockUserToRegister = new RegisterUser({...payload, password: 'encrypted password'});
        const mockRegisteredUser = new RegisteredUser({
            id: 'user-123',
            name: payload.name,
            username: payload.username
        });

        // mock function
        const userRepository = new UserRepositoryAbstract();
        const passwordHash = new PasswordHash();

        userRepository.verifyAvailableUsername = jest.fn().mockImplementation(() => Promise.resolve);
        passwordHash.hash = jest.fn().mockImplementation(() => 'encrypted password');
        userRepository.register = jest.fn().mockImplementation(() => Promise.resolve(mockRegisteredUser));

        // create register usecase instances
        const registerUseCase = new RegisterUseCase({
            userRepository,
            passwordHash
        });

        const registeredUser = await registerUseCase.execute(payload);

        expect(userRepository.verifyAvailableUsername).toHaveBeenCalledWith(payload.username);
        expect(passwordHash.hash).toHaveBeenCalledWith(payload.password);
        expect(userRepository.register).toHaveBeenCalledWith(mockUserToRegister);
        expect(registeredUser).toStrictEqual(mockRegisteredUser)

    })
})