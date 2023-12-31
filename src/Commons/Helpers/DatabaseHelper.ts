/* istanbul ignore file */

import RegisterUser from "../../Domains/Entities/Users/RegisterUser"
import bcrypt from 'bcrypt';
import UnauthorizeError from "../Exceptions/UnauthorizeError";
import NotFoundError from "../Exceptions/NotFoundError";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

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
    async createUserWithEncryptedPassword(payload: RegisterUser) {
        const {password} = payload;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await prismaClient.user.create({
            data: {
                id: 'user-123',
                name: payload.name,
                nik: '123456',
                password: encryptedPassword,
                username: 'ripanrenaldi',
                userRole: {
                    connectOrCreate: {
                        where: {
                            role: 'user'
                        },
                        create: {
                            role: 'user'
                        }
                    }
                }
            },
            include: {
                userRole: {
                    select: {
                        role: true
                    }
                }
            }
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
                document: true
            }
        })
        return user;
    },

    async findUserByUsername(username: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                username
            },
            include: {
                authentication: true,
                userRole: true,
                document: true
            }
        });
        return user;
    },
    async cleanAllData(){
        await prismaClient.$queryRaw`TRUNCATE TABLE users CASCADE`;
        await prismaClient.$queryRaw`TRUNCATE TABLE roles CASCADE`;
        await prismaClient.$queryRaw`TRUNCATE TABLE requests CASCADE`;
    },
    async insertTokenToSpecificUser (token: string, userId: string) {
        const user = await prismaClient.user.update({
            data: {
                authentication: {
                    create: {
                        token
                    }
                }
            },
            where: {
                id: userId
            }
        });
        if(!!!user) {
            throw new NotFoundError('User tidak tersedia di database');
        }
        return !!user;
    }
}

export default databaseHelper;