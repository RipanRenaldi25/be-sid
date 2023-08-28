import TokenRepositoryConcrete from '../TokenRepositoryConcrete';
import prismaClient from '../../Database/Prisma/PostgreSQL/PrismaClient';
import NotFoundError from '../../../Commons/Exceptions/NotFoundError';
import RegisterUser from '../../../Domains/Entities/Users/RegisterUser';
import databaseHelper from '../../../Commons/Helpers/DatabaseHelper';


describe('Token Repository Concrete', () => {
    beforeAll(async () => {
        await databaseHelper.cleanAllData();
    })
    afterEach(async () => {
        await databaseHelper.cleanAllData();
    })
    afterAll(async () => {
        await databaseHelper.cleanAllData();
    })
    describe('CheckValidRefreshToken', () => {
        beforeAll(async () => {
            await databaseHelper.cleanAllData();
        })
        afterEach(async () => {
            await databaseHelper.cleanAllData()
        })
        it('Should throw NotFoundError when refresh token is not found', async() => {
            const refreshToken = 'invalid refresh token';
            const tokenRepository = new TokenRepositoryConcrete({prisma: prismaClient});
            await expect(() => tokenRepository.checkValidRefreshToken(refreshToken)).rejects.toThrowError(NotFoundError);
        });
        // it('Should return user payload when refresh token is found', async () => {
        //     const payload = {
        //         username: 'ripanrenaldi55',
        //         role: 'user',
        //         password: '123123',
        //         nik: '32173827131',
        //         name: 'ripan renaldi'
        //     };
        //     const userToRegister = new RegisterUser(payload);
        //     await databaseHelper.cleanAllData();
        //     const user = await databaseHelper.createUser(userToRegister);
        //     await databaseHelper.insertTokenToSpecificUser('asdasd', user.id);

        //     const tokenRepository = new TokenRepositoryConcrete({prisma: prismaClient});
        //     const newPayload = await tokenRepository.checkValidRefreshToken('asdasd');

        //     expect(newPayload).toEqual({
        //         id: user.id,
        //         name: user.name,
        //         role: user.role,
        //         username: user.username
        //     });
        // })
    })
})