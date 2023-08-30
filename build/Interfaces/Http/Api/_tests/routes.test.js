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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const CreateServer_1 = __importDefault(require("../../../../Infrastructures/Http/Express/CreateServer"));
describe('Routes', () => {
    let app = (0, routes_1.default)(express_1.default, (0, CreateServer_1.default)());
    describe('/', () => {
        it('Should be able to show message SID Document Management API', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('SID Document Management API');
        }));
    });
});
