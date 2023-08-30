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
const client_1 = require("@prisma/client");
const DatabaseHelper_1 = __importDefault(require("../../../../../Commons/Helpers/DatabaseHelper"));
const PrismaClient_1 = __importDefault(require("../PrismaClient"));
const RegisterUser_1 = __importDefault(require("../../../../../Domains/Entities/Users/RegisterUser"));
describe('Prisma Client', () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    it('Should be able to connect to database', () => __awaiter(void 0, void 0, void 0, function* () {
        const prismaClient = new client_1.PrismaClient();
        yield prismaClient.$connect();
        yield prismaClient.$disconnect();
    }));
    it('Should be able to update', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield DatabaseHelper_1.default.createUser(userToRegister);
        const userWithToken = yield PrismaClient_1.default.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                authentication: true
            }
        });
        console.log({ userWithToken });
    }));
});
