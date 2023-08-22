import InvariantError from "../../Commons/Exceptions/InvariantError";
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

}

export default UserRepositoryConcrete