import { Container } from 'instances-container';


// IMPORT REPOSITORY
import UserRepositoryConcrete from '../Repository/UserRepositoryConcrete';

// SECURITY SERVICES
import PasswordHashConcrete from '../Security/Hash/PasswordHashConcrete';


// EXTERNAL DEPENDENCIES
import bcrypt from 'bcrypt';
import jsowebtoken from 'jsonwebtoken';
import prismaClient from '../Database/Prisma/PostgreSQL/PrismaClient';
import { v4 } from 'uuid';

// USE CASE
import RegisterUseCase from '../../Applications/Usecase/RegisterUsecase';

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
    }
]);


export default container;