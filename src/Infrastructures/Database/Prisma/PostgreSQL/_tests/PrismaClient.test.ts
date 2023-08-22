import { PrismaClient } from '@prisma/client';

describe('Prisma Client', () => {
    it('Should be able to connect to database', async () => {

        const prismaClient = new PrismaClient();
        await prismaClient.$connect();

        await prismaClient.$disconnect();
    })
})