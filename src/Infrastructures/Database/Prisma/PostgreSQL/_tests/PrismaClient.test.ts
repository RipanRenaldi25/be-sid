import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

describe('Prisma Client', () => {
    it('Should be able to connect to database', async () => {
        process.env.NODE_ENV === 'test' ? dotenv.config({path: '.env.test'}) : dotenv.config({path: '.env.dev'})

        const prismaClient = new PrismaClient();
        await prismaClient.$connect();

        await prismaClient.$disconnect();
    })
})