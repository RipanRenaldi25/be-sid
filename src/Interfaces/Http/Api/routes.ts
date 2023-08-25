import express from 'express';
import container from '../../../Infrastructures/Container/ServicesContainer';

type MidlewareParameterType = {
    name: string,
    midlewares: express.RequestHandler
}

const routes = (express: any, app: express.Express, midlewares?: MidlewareParameterType[]) => {
    const router = express.Router();
    app.get('/', (req: express.Request, res: express.Response) => {
        res.json({
            status: 'success',
            message: 'SID Document Management API'
        });
    });
    app.use(router);

    return app;
}

export default routes;