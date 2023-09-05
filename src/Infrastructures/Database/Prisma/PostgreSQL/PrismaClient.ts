import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
    log: ['query', 'info', 'error'],
    errorFormat: 'pretty'
});
export default prismaClient;