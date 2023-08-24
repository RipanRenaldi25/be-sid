import { Express, Router } from 'express';

const routes = (app: Express, routerApp: Router, ...midlewares: any) => {
    const router = routerApp;
    
    app.get('/', (req, res) => {
        res.json({
            status: 'success',
            message: 'SID Document Management API'
        });
    });
    
    app.use(router);

    return app;
}

export default routes;