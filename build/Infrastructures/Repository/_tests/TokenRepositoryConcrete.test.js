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
const TokenRepositoryConcrete_1 = __importDefault(require("../TokenRepositoryConcrete"));
const PrismaClient_1 = __importDefault(require("../../Database/Prisma/PostgreSQL/PrismaClient"));
const NotFoundError_1 = __importDefault(require("../../../Commons/Exceptions/NotFoundError"));
const DatabaseHelper_1 = __importDefault(require("../../../Commons/Helpers/DatabaseHelper"));
describe('Token Repository Concrete', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    describe('CheckValidRefreshToken', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield DatabaseHelper_1.default.cleanAllData();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield DatabaseHelper_1.default.cleanAllData();
        }));
        it('Should throw NotFoundError when refresh token is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const refreshToken = 'invalid refresh token';
            const tokenRepository = new TokenRepositoryConcrete_1.default({ prisma: PrismaClient_1.default });
            yield expect(() => tokenRepository.checkValidRefreshToken(refreshToken)).rejects.toThrowError(NotFoundError_1.default);
        }));
        // it('Should return user payload when refresh token is found', async () => {
        //     const payload = {
        //         username: 'ripanrenaldi55',
        //         role: 'user',
        //         password: '123123',
        //         nik: '32173827131',
        //         name: 'ripan renaldi'
        //     };
        //     const userToRegister = new RegisterUser(payload);
        //     await databaseHelper.cleanAllData();
        //     const user = await databaseHelper.createUser(userToRegister);
        //     await databaseHelper.insertTokenToSpecificUser('asdasd', user.id);
        //     const tokenRepository = new TokenRepositoryConcrete({prisma: prismaClient});
        //     const newPayload = await tokenRepository.checkValidRefreshToken('asdasd');
        //     expect(newPayload).toEqual({
        //         id: user.id,
        //         name: user.name,
        //         role: user.role,
        //         username: user.username
        //     });
        // })
    });
});
