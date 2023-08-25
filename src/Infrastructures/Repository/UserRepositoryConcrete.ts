import InvariantError from "../../Commons/Exceptions/InvariantError";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import RegisterUser from "../../Domains/Entities/Users/RegisterUser";
import RegisteredUser from "../../Domains/Entities/Users/RegisteredUser";
import UserRepositoryAbstract from "../../Domains/Repository/UserRepositoryAbstract";
import { PrismaClient } from "@prisma/client";

class UserRepositoryConcrete extends UserRepositoryAbstract {
    prisma: PrismaClient;
    idGenerator: Function;
    
    constructor({prisma, idGenerator}: {prisma: PrismaClient, idGenerator: Function}){
        super();
        this.prisma = prisma;
        this.idGenerator = idGenerator;
    }

    async verifyAvailableUsername(username: string): Promise<void> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        });
        if(!!user){
            throw new InvariantError('Username sudah digunakan', 400);
        };
    }
    
    async register(payload: RegisterUser):Promise<RegisteredUser> {
        const id = `user-${this.idGenerator()}`;
        const {username, name, nik, password} = payload;
        const newUser = await this.prisma.user.create({
            data: {
                id,
                username,
                name,
                nik,
                password,
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
            }
        })

        return new RegisteredUser({...newUser});
    }

    async checkUserOnDatabase(username: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        });
        if(!user){
            throw new NotFoundError('Username tidak ditemukan');
        }
        return true;
    }

}

export default UserRepositoryConcrete