"use strict";
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
dotenv_1.default.config();
const init = () => {
    const app = (0, routes_1.default)(express_1.default, (0, CreateServer_1.default)());
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
};
init();
