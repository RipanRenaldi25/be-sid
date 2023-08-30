"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instances_container_1 = require("instances-container");
// IMPORT REPOSITORY
const UserRepositoryConcrete_1 = __importDefault(require("../Repository/UserRepositoryConcrete"));
const TokenRepositoryConcrete_1 = __importDefault(require("../Repository/TokenRepositoryConcrete"));
// SECURITY SERVICES
const PasswordHashConcrete_1 = __importDefault(require("../Security/Hash/PasswordHashConcrete"));
const TokenGeneratorConcrete_1 = __importDefault(require("../Security/Token/TokenGeneratorConcrete"));
// EXTERNAL DEPENDENCIES
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PrismaClient_1 = __importDefault(require("../Database/Prisma/PostgreSQL/PrismaClient"));
const uuid_1 = require("uuid");
// USE CASE
const RegisterUsecase_1 = __importDefault(require("../../Applications/Usecase/RegisterUsecase"));
const LoginUsecase_1 = __importDefault(require("../../Applications/Usecase/LoginUsecase"));
const UpdateAccessToken_1 = __importDefault(require("../../Applications/Usecase/UpdateAccessToken"));
const container = new instances_container_1.Container();
container.register([
    {
        key: UserRepositoryConcrete_1.default.name,
        Class: UserRepositoryConcrete_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [{
                    name: 'prisma',
                    concrete: PrismaClient_1.default
                },
                {
                    name: 'idGenerator',
                    concrete: uuid_1.v4
                },
                {
                    name: 'passwordService',
                    internal: PasswordHashConcrete_1.default.name
                }
            ]
        }
    },
    {
        key: PasswordHashConcrete_1.default.name,
        Class: PasswordHashConcrete_1.default,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt_1.default
                }
            ]
        }
    },
    {
        key: RegisterUsecase_1.default.name,
        Class: RegisterUsecase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepositoryConcrete_1.default.name
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHashConcrete_1.default.name
                }
            ]
        }
    },
    {
        key: TokenGeneratorConcrete_1.default.name,
        Class: TokenGeneratorConcrete_1.default,
        parameter: {
            dependencies: [
                {
                    concrete: jsonwebtoken_1.default
                }
            ]
        }
    },
    {
        key: LoginUsecase_1.default.name,
        Class: LoginUsecase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepositoryConcrete_1.default.name
                },
                {
                    name: 'tokenGenerator',
                    internal: TokenGeneratorConcrete_1.default.name
                }
            ]
        }
    },
    {
        key: TokenRepositoryConcrete_1.default.name,
        Class: TokenRepositoryConcrete_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [{
                    name: 'prisma',
                    concrete: PrismaClient_1.default
                }]
        }
    },
    {
        key: UpdateAccessToken_1.default.name,
        Class: UpdateAccessToken_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'tokenGenerator',
                    internal: TokenGeneratorConcrete_1.default.name
                },
                {
                    name: 'tokenRepository',
                    internal: TokenRepositoryConcrete_1.default.name
                }
            ]
        }
    }
]);
exports.default = container;
