import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

process.env.NODE_ENV === 'test' ? dotenv.config({path: '.env.test'}) : dotenv.config({path: '.env.dev'})

const prismaClient = new PrismaClient({
    log: ['query', 'info', 'error', 'warn'],
    errorFormat: 'pretty'
});
export default prismaClient;