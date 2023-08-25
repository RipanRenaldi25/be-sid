import PasswordHashAbstract from "../../Applications/Security/PasswordHash";
import InvariantError from "../../Commons/Exceptions/InvariantError";
import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import UnauthorizeError from "../../Commons/Exceptions/UnauthorizeError";
import IUser from "../../Domains/Entities/Users/Interface/UserInterface";
import RegisterUser from "../../Domains/Entities/Users/RegisterUser";
import RegisteredUser from "../../Domains/Entities/Users/RegisteredUser";
import UserLogedIn from "../../Domains/Entities/Users/UserLogedIn";
import UserRepositoryAbstract, { UserWithRoleType } from "../../Domains/Repository/UserRepositoryAbstract";
import { PrismaClient } from "@prisma/client";

class UserRepositoryConcrete extends UserRepositoryAbstract {
    prisma: PrismaClient;
    idGenerator: Function;
    passwordService: PasswordHashAbstract
    
    constructor({prisma, idGenerator, passwordService}: {prisma: PrismaClient, idGenerator: Function, passwordService: PasswordHashAbstract}){
        super();
        this.prisma = prisma;
        this.idGenerator = idGenerator;
        this.passwordService = passwordService;
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

    async getUserByUsername(username: string): Promise<UserWithRoleType | null> {
        const user: UserWithRoleType | null  = await this.prisma.user.findUnique({
            where: {
                username
            },
            include: {
                userRole: {
                    select: {
                        role: true
                    }
                }
            }
        });
        return user;
    }

    async login(payload: Pick<IUser, "username" | "password">): Promise<any> {
        const {username, password} = payload;
        const user = await this.getUserByUsername(username);
        const isMatch = await this.passwordService.comparePassword(password, user!.password);
        if(!isMatch){
            throw new UnauthorizeError('Username atau password salah');
        };
    }



}

export default UserRepositoryConcrete