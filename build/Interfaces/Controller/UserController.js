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
/* istanbul ignore file */
const ClientError_1 = __importDefault(require("../../Commons/Exceptions/ClientError"));
const RegisterUsecase_1 = __importDefault(require("../../Applications/Usecase/RegisterUsecase"));
const LoginUsecase_1 = __importDefault(require("../../Applications/Usecase/LoginUsecase"));
const ServicesContainer_1 = __importDefault(require("../../Infrastructures/Container/ServicesContainer"));
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const registerUseCase = ServicesContainer_1.default.getInstance(RegisterUsecase_1.default.name);
                const newUser = yield registerUseCase.execute(payload);
                res.status(201).json({
                    status: 'success',
                    message: 'berhasil membuat user',
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        username: newUser.username
                    }
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `Server error ${err.message}`
                    });
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const loginUsecase = ServicesContainer_1.default.getInstance(LoginUsecase_1.default.name);
                const user = yield loginUsecase.execute({ username, password });
                console.log({ user: user.id });
                res.status(200).json({
                    status: 'success',
                    message: 'berhasil login',
                    data: {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        username,
                        accessToken: user.token,
                        refreshToken: user.refreshToken
                    }
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: 'Username atau password salah'
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `SERVER ERROR : ${err.message}`
                    });
                }
            }
        });
    }
}
exports.default = UserController;
