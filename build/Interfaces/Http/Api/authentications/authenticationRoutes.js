"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationRoute = (express, controller) => {
    const router = express.Router();
    router.put('/', controller.updateRefreshToken);
    router.delete('/:refreshToken', controller.deleteRefreshToken);
    return router;
};
exports.default = authenticationRoute;
