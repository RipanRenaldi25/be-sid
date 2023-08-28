import { PrismaClient } from '@prisma/client';
import databaseHelper from '../../../../../Commons/Helpers/DatabaseHelper';
import prismaClient from '../PrismaClient';
import RegisterUser from '../../../../../Domains/Entities/Users/RegisterUser';

describe('Prisma Client', () => {
    afterEach(async () => {
        await databaseHelper.cleanAllData();
    })
    it('Should be able to connect to database', async () => {

        const prismaClient = new PrismaClient();
        await prismaClient.$connect();

        await prismaClient.$disconnect();
    })
    it('Should be able to update', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser(payload);
        const user = await databaseHelper.createUser(userToRegister);
        const userWithToken = await prismaClient.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                authentication: true
            }
        });
        console.log({userWithToken});
    })
})