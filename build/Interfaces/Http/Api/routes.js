"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (express, app, midlewares) => {
    const router = express.Router();
    app.get('/', (req, res) => {
        res.json({
            status: 'success',
            message: 'SID Document Management API'
        });
    });
    app.use(router);
    return app;
};
exports.default = routes;
