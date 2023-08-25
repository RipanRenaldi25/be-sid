import routes from "./Interfaces/Http/Api/routes";
import createServer from "./Infrastructures/Http/Express/CreateServer";
import express, { Router, Express } from 'express';
import userRoutes from "./Interfaces/Http/Api/users/userRoutes";
import UserController from "./Interfaces/Controller/UserController";

const init = () => {
    const router = express.Router();
    const app = routes(express, createServer());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/users', userRoutes(express, UserController));
    app.use('/', router.post('/', UserController.login))
    app.listen(3001, () => {
        console.log(`SERVER RUNNING ON PORT ${3001}`);
    });

};
init();