import LoginUseCase from '../LoginUsecase';
import UserRepositoryAbstract from '../../../Domains/Repository/UserRepositoryAbstract';
import TokenGeneratorAbstract from '../../Security/TokenGeneratorAbstract';
import UserLogedIn from '../../../Domains/Entities/Users/UserLogedIn';
import RegisteredUser from '../../../Domains/Entities/Users/RegisteredUser';

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    generateToken() {
        return '123';
    }
    generateRefreshToken(payload: { id: string; username: string; role: string; }, expireInHour: number, secretToken: string): string {
        return 'asd';
    }
    checkExpireOfRefreshToken(refreshToken: string): void {
        throw new Error();
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
        userRepository.insertRefreshToken = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.login = jest.fn().mockImplementation(() => Promise.resolve);
        userRepository.getUserByUsername = jest.fn().mockImplementation(() => Promise.resolve({
            id: mockRegisteredUser.id,
            name: mockRegisteredUser.name,
            username: mockRegisteredUser.username,
            role: mockRegisteredUser.role,
        }));
        userRepository.deleteUserTokenIfExists = jest.fn().mockImplementation(() => Promise.resolve(true));
        tokenGenerator.generateToken = jest.fn().mockImplementation(() => '123123');
        tokenGenerator.generateRefreshToken = jest.fn().mockImplementation(() => 'REFRESH_TOKEN');
        const userLogedIn = await LoginUsecase.execute(payload);

        expect(userRepository.checkUserOnDatabase).toHaveBeenCalledWith(payload.username);
        expect(userRepository.insertRefreshToken).toHaveBeenCalledWith('REFRESH_TOKEN', mockRegisteredUser.id);
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
            refreshToken: 'REFRESH_TOKEN'
        })

    })
})