import { PrismaClient } from "@prisma/client";
import TokenRepositoryAbstract from "../../Domains/Repository/TokenRepositoryAbstract";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";

class TokenRepositoryConcrete extends TokenRepositoryAbstract {
    prisma: PrismaClient
    constructor({ prisma }: {prisma: PrismaClient}){
        super();
        this.prisma = prisma;
    };

    async checkValidRefreshToken(refreshToken: string): Promise<{ id: string; name: string; role: string; username: string; }> {
        const user = await this.prisma.authentication.findUnique({
            where: {
                token: refreshToken
            },
            include: {
                user: true
            }
        });

        if(!user){
            throw new NotFoundError('Refresh token salah');
        }

        return {
            id: user!.user.id,
            name: user!.user.name,
            role: user!.user.role,
            username: user!.user.username
        }
    }

    async deleteRefreshToken(refreshToken: string): Promise<void> {
        await this.prisma.authentication.delete({
            where: {
                token: refreshToken
            }
        })
    }
}

export default TokenRepositoryConcrete;