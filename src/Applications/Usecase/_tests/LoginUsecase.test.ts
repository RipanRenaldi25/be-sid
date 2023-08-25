import LoginUseCase from '../LoginUsecase';
import UserRepositoryAbstract from '../../../Domains/Repository/UserRepositoryAbstract';
import TokenGeneratorAbstract from '../../Security/TokenGeneratorAbstract';
import UserLogedIn from '../../../Domains/Entities/Users/UserLogedIn';
import RegisteredUser from '../../../Domains/Entities/Users/RegisteredUser';

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    generateToken() {
        return '123';
    }
}

describe('Login Use Case', () => {
    it('Should orchestrate correctly', async () => {
        // arrange
        const secretToken = 'TOKEN_RAHASIA';
        const payload = {
            username: 'ripanrenaldi25',
            password: 'rahasia'
        };
        const mockRegisteredUser = new RegisteredUser({
            id: 'user-123',
            name: 'ripan renaldi',
            username: payload.username
        });
        mockRegisteredUser.role = 'user';

        const userRepository = new UserRepositoryAbstract();
        const tokenGenerator = new TokenGeneratorConcrete();
        const LoginUsecase = new LoginUseCase({userRepository, tokenGenerator});

        // mock function
        userRepository.checkUserOnDatabase = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.login = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.getUserByUsername = jest.fn().mockImplementation(() => Promise.resolve({
            id: mockRegisteredUser.id,
            name: mockRegisteredUser.name,
            username: mockRegisteredUser.username,
            role: mockRegisteredUser.role,
        }));
        tokenGenerator.generateToken = jest.fn().mockImplementation(() => '123123');
        const userLogedIn = await LoginUsecase.execute(payload);

        expect(userRepository.checkUserOnDatabase).toHaveBeenCalledWith(payload.username);
        expect(userRepository.login).toHaveBeenCalledWith(payload);
        expect(tokenGenerator.generateToken).toHaveBeenCalledWith({
            id: 'user-123',
            username: payload.username,
            role: mockRegisteredUser.role
        }, secretToken);
        expect(userLogedIn).toEqual({
            id: mockRegisteredUser.id,
            name: mockRegisteredUser.name,
            role: mockRegisteredUser.role,
            username: payload.username,
            token: '123123',

            
        })

    })
})