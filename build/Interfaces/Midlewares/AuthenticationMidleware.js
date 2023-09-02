"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = __importDefault(require("../../Commons/Helpers/Utilities"));
const UnauthorizeError_1 = __importDefault(require("../../Commons/Exceptions/UnauthorizeError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ClientError_1 = __importDefault(require("../../Commons/Exceptions/ClientError"));
;
const authenticationMidleware = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new UnauthorizeError_1.default('Unauthorize user');
        }
        else {
            const accessToken = Utilities_1.default.getAccessToken(bearerToken);
            const userPayload = jsonwebtoken_1.default.verify(accessToken, process.env.SECRET_TOKEN || '');
            req.user = userPayload;
        }
        next();
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
                message: `error ${err.message}`
            });
        }
    }
};
exports.default = authenticationMidleware;
