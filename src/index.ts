import routes from "./Interfaces/Http/Api/routes";
import createServer from "./Infrastructures/Http/Express/CreateServer";
import express, { Router, Express } from 'express';

const init = () => {
    let app: Express = createServer();
    const router: Router = express.Router();
    app = routes(app, router);
    app.listen(3001, () => {
        console.log(`SERVER RUNNING ON PORT ${3000}}`);
    });

};
init();