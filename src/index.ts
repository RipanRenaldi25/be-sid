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
import container from "./Infrastructures/Container/ServicesContainer";
import UserRepositoryConcrete from "./Infrastructures/Repository/UserRepositoryConcrete";
import RegisterUseCase from "./Applications/Usecase/RegisterUsecase";
dotenv.config();

const init = async () => {
    const app = routes(express, createServer());
    const registerUseCase = container.getInstance(RegisterUseCase.name);
    const userRepository = container.getInstance(UserRepositoryConcrete.name);
    const admin = await userRepository.getUserByUsername('admin');
    if(!admin){
        const payload = {
            username: 'admin',
            password: process.env.ADM_PW!,
            name: 'admin',
            nik: process.env.ADM_NIK!,
            role: 'admin'
        }
        await registerUseCase.execute(payload);
    }

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors())
    app.use('/upload', express.static('upload'));
    app.use('/users', userRoutes(express, UserController));
    app.use('/authentications', authenticationRoute(express, AuthenticationController));
    app.use('/documents', authenticationMidleware, documentRoutes(express, DocumentController));
    app.listen(+process.env.PORT_APP!, () => {
        console.log(`SERVER RUNNING ON PORT ${process.env.PORT_APP}`);
    });
};

init();

