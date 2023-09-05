"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../Commons/Exceptions/InvariantError"));
const NotFoundError_1 = __importDefault(require("../../Commons/Exceptions/NotFoundError"));
const UnauthorizeError_1 = __importDefault(require("../../Commons/Exceptions/UnauthorizeError"));
const RegisteredUser_1 = __importDefault(require("../../Domains/Entities/Users/RegisteredUser"));
const UserRepositoryAbstract_1 = __importDefault(require("../../Domains/Repository/UserRepositoryAbstract"));
class UserRepositoryConcrete extends UserRepositoryAbstract_1.default {
    constructor({ prisma, idGenerator, passwordService }) {
        super();
        this.prisma = prisma;
        this.idGenerator = idGenerator;
        this.passwordService = passwordService;
    }
    verifyAvailableUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (user) {
                throw new InvariantError_1.default('Username sudah digunakan', 400);
            }
            ;
        });
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = `user-${this.idGenerator()}`;
            const { username, name, nik, password, phone } = payload;
            let newUser;
            if (phone) {
                newUser = yield this.prisma.user.create({
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
                });
            }
            else {
                newUser = yield this.prisma.user.create({
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
                });
            }
            return new RegisteredUser_1.default(Object.assign({}, newUser));
        });
    }
    checkUserOnDatabase(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (!user) {
                throw new NotFoundError_1.default('Username tidak ditemukan');
            }
            return true;
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
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
        });
    }
    getUserToken(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
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
        });
    }
    deleteUserTokenIfExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserToken(username);
            if (user === null || user === void 0 ? void 0 : user.authentication) {
                yield this.prisma.authentication.delete({
                    where: {
                        user_id: user.id
                    }
                });
                return true;
            }
            return false;
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = payload;
            yield this.deleteUserTokenIfExists(username);
            const user = yield this.getUserByUsername(username);
            const isMatch = yield this.passwordService.comparePassword(password, user.password);
            if (!isMatch) {
                throw new UnauthorizeError_1.default('Username atau password salah');
            }
            ;
        });
    }
    insertRefreshToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.update({
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
            }
            catch (e) {
                throw new NotFoundError_1.default(e.message);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany({
                include: {
                    phones: {
                        select: {
                            phone_number: true
                        }
                    }
                },
            });
            return users;
        });
    }
    getUserByNIK(nik) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findMany({
                where: {
                    nik: {
                        contains: nik,
                    }
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
        });
    }
}
exports.default = UserRepositoryConcrete;
