"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes = (express, controller) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.send('test');
    });
    router.post('/register', controller.createUser);
    router.post('/login', controller.login);
    return router;
};
exports.default = userRoutes;
