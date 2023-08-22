/* istanbul ignore file */

import RegisterUser from "../../Domains/Entities/Users/RegisterUser"
import prismaClient from "../../Infrastructures/Database/Prisma/PostgreSQL/PrismaClient"
import dotenv from 'dotenv';

const databaseHelper = {
    async createUser (payload: RegisterUser) {
        const newUser = await prismaClient.user.create({
            data: {
                id: 'user-123',
                name: payload.name,
                nik: '123456',
                password: 'rahasia',
                username: 'ripanrenaldi',
                userRole: {
                    connectOrCreate: {
                        where: {
                            role: payload.role
                        },
                        create: {
                            role: payload.role
                        }
                    }
                }
            },
        });
        
        return newUser;
    },
    async findUserById(id: string){
        const user = await prismaClient.user.findUnique({
            where: {
                id,
            },
            include: {
                authentication: true,
                userRole: true,
            }
        })
        return user;
    },
    async cleanAllData(){
        await prismaClient.$queryRaw`TRUNCATE TABLE users CASCADE`;
        await prismaClient.$queryRaw`TRUNCATE TABLE roles CASCADE`;
    }
}

export default databaseHelper;