import UserRepositoryConcrete from '../UserRepositoryConcrete';
import databaseHelper from '../../../Commons/Helpers/DatabaseHelper';
import RegisterUser from '../../../Domains/Entities/Users/RegisterUser';
import prismaClient from '../../Database/Prisma/PostgreSQL/PrismaClient';
import InvariantError from '../../../Commons/Exceptions/InvariantError';

/**
 * it should throw error when username is not available in database
 */

describe('User Repository Concrete', () => {
    beforeEach(async () => {
        await databaseHelper.cleanAllData();
    })
    describe('Verify Available Username', () => {
        it('it should throw error when username is not available in database', async () => {
            // arrange
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'admin',
                name: 'ripan renaldi'
            }
            await prismaClient.user.create({
                data: {
                    name: payload.name,
                    password: payload.password,
                    username: payload.username,
                    nik: '123123',
                    userRole: {
                        connectOrCreate: {
                            where: {
                                role: 'admin'
                            },
                            create: {
                                role: 'admin'
                            }
                        }
                    }
                }
            })

            const userRepository = new UserRepositoryConcrete({prisma: prismaClient, idGenerator: () => {}});
            await expect(userRepository.verifyAvailableUsername(payload.username)).rejects.toThrowError(InvariantError);
        })

    })
})