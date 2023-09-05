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
const routes_1 = __importDefault(require("./Interfaces/Http/Api/routes"));
const CreateServer_1 = __importDefault(require("./Infrastructures/Http/Express/CreateServer"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Interfaces/Http/Api/users/userRoutes"));
const UserController_1 = __importDefault(require("./Interfaces/Controller/UserController"));
const documentRoutes_1 = __importDefault(require("./Interfaces/Http/Api/documents/documentRoutes"));
const DocumentController_1 = __importDefault(require("./Interfaces/Controller/DocumentController"));
const AuthenticationController_1 = __importDefault(require("./Interfaces/Controller/AuthenticationController"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthenticationMidleware_1 = __importDefault(require("./Interfaces/Midlewares/AuthenticationMidleware"));
const authenticationRoutes_1 = __importDefault(require("./Interfaces/Http/Api/authentications/authenticationRoutes"));
const cors_1 = __importDefault(require("cors"));
const ServicesContainer_1 = __importDefault(require("./Infrastructures/Container/ServicesContainer"));
const UserRepositoryConcrete_1 = __importDefault(require("./Infrastructures/Repository/UserRepositoryConcrete"));
const RegisterUsecase_1 = __importDefault(require("./Applications/Usecase/RegisterUsecase"));
dotenv_1.default.config();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, routes_1.default)(express_1.default, (0, CreateServer_1.default)());
    const registerUseCase = ServicesContainer_1.default.getInstance(RegisterUsecase_1.default.name);
    const userRepository = ServicesContainer_1.default.getInstance(UserRepositoryConcrete_1.default.name);
    const admin = yield userRepository.getUserByUsername('admin');
    if (!admin) {
        const payload = {
            username: 'admin',
            password: process.env.ADM_PW,
            name: 'admin',
            nik: process.env.ADM_NIK,
            role: 'admin'
        };
        yield registerUseCase.execute(payload);
    }
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)());
    app.use('/upload', express_1.default.static('upload'));
    app.use('/users', (0, userRoutes_1.default)(express_1.default, UserController_1.default));
    app.use('/authentications', (0, authenticationRoutes_1.default)(express_1.default, AuthenticationController_1.default));
    app.use('/documents', AuthenticationMidleware_1.default, (0, documentRoutes_1.default)(express_1.default, DocumentController_1.default));
    app.listen(3001, () => {
        console.log(`SERVER RUNNING ON PORT ${3001}`);
    });
});
init();
