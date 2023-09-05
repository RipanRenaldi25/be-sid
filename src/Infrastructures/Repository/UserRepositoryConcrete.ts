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
        if(user){
            throw new InvariantError('Username sudah digunakan', 400);
        };
    }
    
    async register(payload: RegisterUser):Promise<RegisteredUser> {
        const id = `user-${this.idGenerator()}`;
        const {username, name, nik, password, phone} = payload;
        let newUser;
        if(phone){
            newUser = await this.prisma.user.create({
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
                    },
                    phones: {
                        create: {
                            phone_number: phone
                        }
                    }
                }
            })
        }else {
            newUser = await this.prisma.user.create({
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
                    },
                }
            })
            
        }

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
                },
                authentication: true
            }
        });
        return user;
    }
    
    async getUserToken (username: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            },
            include: {
                authentication: {
                    select: {
                        token: true
                    }
                }
            }
        });

        return user;
    }

    async deleteUserTokenIfExists(username: string): Promise<boolean> {
        const user = await this.getUserToken(username);
        if(user?.authentication){
            await this.prisma.authentication.delete({
                where: {
                    user_id: user.id
                }
            });
            return true;
        }
        return false;
    }

    async login(payload: Pick<IUser, "username" | "password">): Promise<any> {
        const {username, password} = payload;
        await this.deleteUserTokenIfExists(username);
        const user = await this.getUserByUsername(username);

        const isMatch = await this.passwordService.comparePassword(password, user!.password);
        if(!isMatch){
            throw new UnauthorizeError('Username atau password salah');
        };
    }

    async insertRefreshToken(token: string, userId: string): Promise<void> {
        try{
            const user = await this.prisma.user.update({
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
        }catch(e: any){
            throw new NotFoundError(e.message);

        }
    }

    async getUsers () {
        const users = await this.prisma.user.findMany({
            include: {
                phones: {
                    select: {
                        phone_number: true
                    }
                }
            },
        });

        return users;
    }

    async getUserByNIK (nik: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                nik
            },
            include: {
                phones: {
                    select: {
                        phone_number: true
                    }
                }
            }
        });
        return user;
    }


}

export default UserRepositoryConcrete