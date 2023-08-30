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
const authenticationRoutes_1 = __importDefault(require("../authenticationRoutes"));
const CreateServer_1 = __importDefault(require("../../../../../Infrastructures/Http/Express/CreateServer"));
const express_1 = __importDefault(require("express"));
const AuthenticationController_1 = __importDefault(require("../../../../Controller/AuthenticationController"));
const supertest_1 = __importDefault(require("supertest"));
const RegisterUser_1 = __importDefault(require("../../../../../Domains/Entities/Users/RegisterUser"));
const DatabaseHelper_1 = __importDefault(require("../../../../../Commons/Helpers/DatabaseHelper"));
const Utilities_1 = __importDefault(require("../../../../../Commons/Helpers/Utilities"));
describe('authentication', () => {
    let app;
    beforeAll(() => {
        app = (0, CreateServer_1.default)();
        app.use(express_1.default.json());
        app.use('/authentications', (0, authenticationRoutes_1.default)(express_1.default, AuthenticationController_1.default));
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DatabaseHelper_1.default.cleanAllData();
    }));
    it('Should have 404 status code when refresh token is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const refreshToken = 'salah';
        const response = yield (0, supertest_1.default)(app).put('/authentications/').set('Accept', 'application/json').send({
            refreshToken
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Refresh token salah');
    }));
    it('Should have 403 status code when refresh token is expire', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield DatabaseHelper_1.default.createUser(userToRegister);
        const refreshToken = Utilities_1.default.createToken({
            id: user.id,
            name: user.name,
            username: user.username
        }, 100, 'rahasia');
        yield DatabaseHelper_1.default.insertTokenToSpecificUser(refreshToken, user.id);
        const response = yield (0, supertest_1.default)(app).put('/authentications/').set('Accept', 'application/json').send({ refreshToken });
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBeDefined();
    }));
    it('Should be able to delete refreshToken', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser_1.default(payload);
        const user = yield DatabaseHelper_1.default.createUser(userToRegister);
        const refreshToken = Utilities_1.default.createToken({
            name: payload.name,
            role: payload.role
        }, 1, 'RAHASIA');
        yield DatabaseHelper_1.default.insertTokenToSpecificUser(refreshToken, user.id);
        const findedUser = yield DatabaseHelper_1.default.findUserByUsername(payload.username);
        console.log({ findedUser });
        const response = yield (0, supertest_1.default)(app).delete(`/authentications/${(_a = findedUser === null || findedUser === void 0 ? void 0 : findedUser.authentication) === null || _a === void 0 ? void 0 : _a.token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('message');
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Logout success');
    }));
});
