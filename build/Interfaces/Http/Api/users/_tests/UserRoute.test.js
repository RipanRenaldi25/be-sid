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
const userRoutes_1 = __importDefault(require("../userRoutes"));
const UserController_1 = __importDefault(require("../../../../Controller/UserController"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const CreateServer_1 = __importDefault(require("../../../../../Infrastructures/Http/Express/CreateServer"));
const DatabaseHelper_1 = __importDefault(require("../../../../../Commons/Helpers/DatabaseHelper"));
const RegisterUser_1 = __importDefault(require("../../../../../Domains/Entities/Users/RegisterUser"));
const PasswordHash_1 = __importDefault(require("../../../../../Applications/Security/PasswordHash"));
const UserLogedIn_1 = __importDefault(require("../../../../../Domains/Entities/Users/UserLogedIn"));
/**
 * Test case
 * /users
 *  /register
 *      * Should return 201 when user register is succeed
 *      * Should return 422 when user payload is not correct
 *      * Should return response property with correct property (id, name, username)
 *      * Should return 400 when username is not available in database
 */
class PasswordHash extends PasswordHash_1.default {
    comparePassword(password, passwordHashed) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error();
        });
    }
}
describe('/users', () => {
    let app = (0, CreateServer_1.default)();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
        app.use(express_1.default.json());
        app.use('/users', (0, userRoutes_1.default)(express_1.default, UserController_1.default));
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    describe('/register', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield DatabaseHelper_1.default.cleanAllData();
        }));
        it('Should return 400 when username is not available in database', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '32732825040200021'
            };
            const registerUser = new RegisterUser_1.default(payload);
            yield DatabaseHelper_1.default.createUser(registerUser);
            const response = yield (0, supertest_1.default)(app).post('/users/register').send(payload).set('Accept', 'application/json');
            expect(response.statusCode).toBe(400);
        }));
        it('Should return 201 when user register is succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            // username, passsworld, role, name, nik
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                username: 'ripanrenaldi33',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '3273282504020002'
            });
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
        }));
        it('Should return 422 when user payload is not correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                username: 'rip',
                password: 'asd',
                role: 'user',
                name: 'test',
            });
            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
        }));
        it('Should return response property with correct property (id, name, username)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                username: 'ripanrenaldi33',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '3273282504020002'
            });
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('berhasil membuat user');
            expect(response.body.status).toBe('success');
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.username).toBe('ripanrenaldi33');
            expect(response.body.data.name).toBe('ripan renaldi');
        }));
    });
    describe('/login', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield DatabaseHelper_1.default.cleanAllData();
        }));
        it('Should be able to throw unauthorize error when username or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '273282504020002'
            };
            const passwordHash = new PasswordHash();
            const registerUser = new RegisterUser_1.default(payload);
            yield DatabaseHelper_1.default.createUser(registerUser);
            passwordHash.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true));
            const response = yield (0, supertest_1.default)(app).post('/users/login').send({
                username: payload.username,
                password: 'passwordSalah'
            }).set('Accept', 'application/json');
            expect(response.statusCode).toBe(401);
            expect(response.body.status).toBe('fail');
        }));
        it('Should be return response property correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '273282504020002'
            };
            const registerUser = new RegisterUser_1.default(payload);
            yield DatabaseHelper_1.default.createUserWithEncryptedPassword(registerUser);
            const response = yield (0, supertest_1.default)(app).post('/users/login').send({
                username: payload.username,
                password: payload.password
            }).set('Accept', 'application/json');
            const userLogedIn = new UserLogedIn_1.default({
                id: 'user-123',
                name: payload.name,
                role: payload.role,
                token: 'asdasda'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.status).toBe('success');
            expect(response.body.message).toBe('berhasil login');
            expect(response.body.data).toHaveProperty('accessToken');
        }));
    });
});
// it('asd', () => {
//     expect(true).toBeTruthy();
// })
