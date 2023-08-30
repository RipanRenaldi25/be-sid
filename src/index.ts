import routes from "./Interfaces/Http/Api/routes";
import createServer from "./Infrastructures/Http/Express/CreateServer";
import express, { Router, Express } from 'express';
import userRoutes from "./Interfaces/Http/Api/users/userRoutes";
import UserController from "./Interfaces/Controller/UserController";
import documentRoutes from "./Interfaces/Http/Api/documents/documentRoutes";
import DocumentController from "./Interfaces/Controller/DocumentController";
import AuthenticationController from "./Interfaces/Controller/AuthenticationController";
import dotenv from 'dotenv';
import authenticationMidleware from "./Interfaces/Midlewares/AuthenticationMidleware";
import authenticationRoute from "./Interfaces/Http/Api/authentications/authenticationRoutes";
import cors from 'cors';
dotenv.config();

const init = () => {
    const app = routes(express, createServer());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use('/upload', express.static('upload'));
    app.use('/users', userRoutes(express, UserController));
    app.use('/authentications', authenticationRoute(express, AuthenticationController));
    app.use('/documents',authenticationMidleware, documentRoutes(express, DocumentController));
    app.listen(3001, () => {
        console.log(`SERVER RUNNING ON PORT ${3001}`);
    });
};

init();

