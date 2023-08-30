import routes from "./Interfaces/Http/Api/routes";
import createServer from "./Infrastructures/Http/Express/CreateServer";
import express, { Router, Express } from 'express';
import userRoutes from "./Interfaces/Http/Api/users/userRoutes";
import UserController from "./Interfaces/Controller/UserController";
import documentRoutes from "./Interfaces/Http/Api/documents/documentRoutes";
import DocumentController from "./Interfaces/Controller/DocumentController";
import AuthenticationController from "./Interfaces/Controller/AuthenticationController";

const init = () => {
    const router = express.Router();
    const app = routes(express, createServer());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/users', userRoutes(express, UserController));
    app.use('/documents', documentRoutes(express, DocumentController));
    app.use('/', router.put('/', AuthenticationController.updateRefreshToken));
    app.use('/:refreshToken', AuthenticationController.deleteRefreshToken);
    app.listen(3001, () => {
        console.log(`SERVER RUNNING ON PORT ${3001}`);
    });
};

init();

