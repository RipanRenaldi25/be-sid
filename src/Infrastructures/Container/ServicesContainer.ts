import { Container } from 'instances-container';


// IMPORT REPOSITORY
import UserRepositoryConcrete from '../Repository/UserRepositoryConcrete';

// SECURITY SERVICES
import PasswordHashConcrete from '../Security/Hash/PasswordHashConcrete';
import TokenGeneratorConcrete from '../Security/Token/TokenGeneratorConcrete';


// EXTERNAL DEPENDENCIES
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import prismaClient from '../Database/Prisma/PostgreSQL/PrismaClient';
import { v4 } from 'uuid';

// USE CASE
import RegisterUseCase from '../../Applications/Usecase/RegisterUsecase';
import LoginUsecase from '../../Applications/Usecase/LoginUsecase';

const container = new Container();

container.register([
    {
        key: UserRepositoryConcrete.name,
        Class: UserRepositoryConcrete,
        parameter: {
            injectType: 'destructuring',
            dependencies: [{
                name: 'prisma',
                concrete: prismaClient
            },
            {
                name: 'idGenerator',
                concrete: v4
            },
            {
                name: 'passwordService',
                internal: PasswordHashConcrete.name
            }
        ]
        }
    },
    {
        key: PasswordHashConcrete.name,
        Class: PasswordHashConcrete,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt
                }
            ]
        }
    },
    {
        key: RegisterUseCase.name,
        Class: RegisterUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepositoryConcrete.name
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHashConcrete.name
                }
            ]
        }
    },
    {
        key: TokenGeneratorConcrete.name,
        Class: TokenGeneratorConcrete,
        parameter: {
            dependencies: [
                {
                    concrete: jsonwebtoken
                }
            ]
        }
    },
    {
        key: LoginUsecase.name,
        Class: LoginUsecase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
            {
                name: 'userRepository',
                internal: UserRepositoryConcrete.name
            },
            {
                name: 'tokenGenerator',
                internal: TokenGeneratorConcrete.name
            }
        ]
        }
    }
]);


export default container;