import UserRepositoryConcrete from '../UserRepositoryConcrete';
import databaseHelper from '../../../Commons/Helpers/DatabaseHelper';
import RegisterUser from '../../../Domains/Entities/Users/RegisterUser';
import prismaClient from '../../Database/Prisma/PostgreSQL/PrismaClient';
import InvariantError from '../../../Commons/Exceptions/InvariantError';
import RegisteredUser from '../../../Domains/Entities/Users/RegisteredUser';
import NotFoundError from '../../../Commons/Exceptions/NotFoundError';

/**
 * it should throw error when username is not available in database
 * Should not throw eror when username is not available in database
 */

describe('User Repository Concrete', () => {
    beforeEach(async () => {
        await databaseHelper.cleanAllData();
    })
    afterAll(async () => {
        await databaseHelper.cleanAllData();
    })
    describe('Verify Available Username', () => {
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
            await databaseHelper.createUser(userToRegister);

            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}});
            await expect(userRepository.verifyAvailableUsername(payload.username)).rejects.toThrowError(InvariantError);
        })
        it('Should not throw eror when username is not available in database', async () => {
            const payload = {
                username: 'ripanrenaldi',
            }
            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}});

            await expect(userRepository.verifyAvailableUsername(payload.username)).resolves.not.toThrowError(InvariantError);
        })

        
    })
    describe('register', () => {
        it('Should create new user on database', async () => {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'admin',
                name: 'ripan renaldi',
                nik: '3273285902391'
            };

            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => '321'});
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
            const userRepository: UserRepositoryConcrete = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => '321'});

            const registeredUser: RegisteredUser = await userRepository.register(userToRegister);

            expect(registeredUser.id).toBe('user-321');
            expect(registeredUser.name).toBe(payload.name);
            expect(registeredUser.username).toBe(payload.username);
            expect(registeredUser).toHaveProperty('id');
            expect(registeredUser).toHaveProperty('name');
            expect(registeredUser).toHaveProperty('username');
        })
    })
    describe('Check User On Database', () => {
        it('Should throw when user is not found in database', async () => {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'admin',
                name: 'ripan renaldi',
                nik: '3273285902391'
            };
            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}});
            await expect(userRepository.checkUserOnDatabase(payload.username)).rejects.toThrowError(NotFoundError);
        })
        it('Should return true when username is found', async () => {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'admin',
                name: 'ripan renaldi',
                nik: '3273285902391'
            };
            const userToRegister = new RegisterUser(payload);
            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}});
            await databaseHelper.createUser(userToRegister);
            const isUserExists = await userRepository.checkUserOnDatabase(payload.username);
            expect(isUserExists).toBe(true);
        })
    })
})