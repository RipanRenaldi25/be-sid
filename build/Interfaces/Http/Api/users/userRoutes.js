"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationMidleware_1 = __importDefault(require("../../../Midlewares/AuthenticationMidleware"));
const userRoutes = (express, controller) => {
    const router = express.Router();
    router.get('/', AuthenticationMidleware_1.default, controller.getUsers);
    router.get('/user/:nik', AuthenticationMidleware_1.default, controller.getUserByNik);
    router.post('/register', controller.createUser);
    router.post('/login', controller.login);
    return router;
};
exports.default = userRoutes;
