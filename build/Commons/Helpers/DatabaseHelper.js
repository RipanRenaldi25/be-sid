"use strict";
/* istanbul ignore file */
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
const PrismaClient_1 = __importDefault(require("../../Infrastructures/Database/Prisma/PostgreSQL/PrismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const NotFoundError_1 = __importDefault(require("../Exceptions/NotFoundError"));
const databaseHelper = {
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield PrismaClient_1.default.user.create({
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
        });
    },
    createUserWithEncryptedPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = payload;
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield PrismaClient_1.default.user.create({
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
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PrismaClient_1.default.user.findUnique({
                where: {
                    id,
                },
                include: {
                    authentication: true,
                    userRole: true,
                    document: true
                }
            });
            return user;
        });
    },
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PrismaClient_1.default.user.findUnique({
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
        });
    },
    cleanAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield PrismaClient_1.default.$queryRaw `TRUNCATE TABLE users CASCADE`;
            yield PrismaClient_1.default.$queryRaw `TRUNCATE TABLE roles CASCADE`;
            yield PrismaClient_1.default.$queryRaw `TRUNCATE TABLE requests CASCADE`;
        });
    },
    insertTokenToSpecificUser(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PrismaClient_1.default.user.update({
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
            if (!!!user) {
                throw new NotFoundError_1.default('User tidak tersedia di database');
            }
            return !!user;
        });
    }
};
exports.default = databaseHelper;
