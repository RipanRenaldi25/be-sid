import UserRepositoryConcrete from '../UserRepositoryConcrete';
import databaseHelper from '../../../Commons/Helpers/DatabaseHelper';
import RegisterUser from '../../../Domains/Entities/Users/RegisterUser';
import prismaClient from '../../Database/Prisma/PostgreSQL/PrismaClient';
import InvariantError from '../../../Commons/Exceptions/InvariantError';
import RegisteredUser from '../../../Domains/Entities/Users/RegisteredUser';
import NotFoundError from '../../../Commons/Exceptions/NotFoundError';
import UnauthorizeError from '../../../Commons/Exceptions/UnauthorizeError';
import PasswordHashAbstract from '../../../Applications/Security/PasswordHash';
/**
 * it should throw error when username is not available in database
 * Should not throw eror when username is not available in database
*/


class PasswordHash extends PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error();
    }
    async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
        throw new Error();
    }
}

describe('User Repository Concrete', () => {
    let passwordService = new PasswordHash();
    beforeAll(async () => {
        await databaseHelper.cleanAllData();
    })
    afterEach(async () => {
        await databaseHelper.cleanAllData();
    })
    afterAll(async () => {
        await databaseHelper.cleanAllData();
    })
    it('should throw error when username is not available in database', async () => {
        // arrange
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        }
        const userToRegister = new RegisterUser(payload);
        await databaseHelper.cleanAllData();
        await databaseHelper.createUser(userToRegister);

        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => '098', passwordService});
        await expect(() => userRepository.verifyAvailableUsername(payload.username)).rejects.toThrowError(InvariantError);
    })
    it('Should not throw eror when username is not available in database', async () => {
        const payload = {
            username: 'username tidak ada di database',
        }
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService});

        await expect(userRepository.verifyAvailableUsername(payload.username)).resolves.not.toThrowError(InvariantError);
    })
    it('Should create new user on database', async () => {
        const payload = {
            username: 'ripanrenaldibaru',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '327328594023912'
        };

        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => '321', passwordService});
        const userToRegister = new RegisterUser(payload);

        const user = await userRepository.register(userToRegister);
        const findUser = await databaseHelper.findUserById(user.id);
        expect(findUser).not.toBeUndefined();
        expect(findUser).toHaveProperty('nik');
    })
    it('Should return registered user correctly', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister: RegisterUser = new RegisterUser(payload);
        const userRepository: UserRepositoryConcrete = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => '321', passwordService});

        const registeredUser: RegisteredUser = await userRepository.register(userToRegister);

        expect(registeredUser.id).toBe('user-321');
        expect(registeredUser.name).toBe(payload.name);
        expect(registeredUser.username).toBe(payload.username);
        expect(registeredUser).toHaveProperty('id');
        expect(registeredUser).toHaveProperty('name');
        expect(registeredUser).toHaveProperty('username');
    })
    it('Should throw when user is not found in database', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService});
        await expect(() => userRepository.checkUserOnDatabase(payload.username)).rejects.toThrowError(NotFoundError);
    })
    it('Should return true when username is found', async () => {
        const payload = {
            username: 'username',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };

        const userToRegister = new RegisterUser(payload);
        const user = await databaseHelper.createUser(userToRegister);
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService})

        const isExists = await userRepository.checkUserOnDatabase(user.username);

        expect(user).toBeDefined();
        expect(isExists).toBe(true);
    })
    it('Should return user', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser(payload);
        await databaseHelper.createUser(userToRegister);
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService});
        const user = await userRepository.getUserByUsername(payload.username);

        expect(user).toBeDefined();
        expect(user?.username).toBe(payload.username);
        expect(user?.name).toBe(payload.name);
    })
    it('should throw unauthorize error when username or password is incorrect', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser(payload);
        await databaseHelper.createUser(userToRegister);
        passwordService.comparePassword = jest.fn().mockImplementation(() => Promise.reject(new UnauthorizeError('asd')));

        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService});
        await expect(() => userRepository.login({username: payload.username, password: payload.password})).rejects.toThrowError(UnauthorizeError);
    })
    it('Should not throw unauthorize error when username or password is correct', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser(payload);
        await databaseHelper.createUser(userToRegister);

        passwordService.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true));
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService});

        await expect(userRepository.login({...payload})).resolves.not.toThrowError(UnauthorizeError);
    })
    it('Should insert token to database correctly', async () => {
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService})
        const payload = {
            username: 'ripanrenaldi4',
            password: 'rahasia',
            role: 'admin',
            name: 'ripan renaldi',
            nik: '3273285902391'
        };
        const userToRegister = new RegisterUser(payload);
        const user = await databaseHelper.createUser(userToRegister);

        await userRepository.insertRefreshToken('asdsa', user.id);

        // get user by username
        const userOnDatabase = await databaseHelper.findUserByUsername(user.username);
        expect(userOnDatabase!.authentication!.token).toBeDefined();
        expect(userOnDatabase!.authentication!.token).toBe('asdsa');
    })
    it('Should throw error when insert token is failed because user is not exists', async () => {
        const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}, passwordService})


        await expect(() => userRepository.insertRefreshToken('asd', 'user-not-found')).rejects.toThrowError(NotFoundError);
    })
})