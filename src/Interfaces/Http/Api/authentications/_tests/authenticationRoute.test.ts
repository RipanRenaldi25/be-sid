import authenticationRoute from "../authenticationRoutes";
import createServer from "../../../../../Infrastructures/Http/Express/CreateServer";
import express from 'express'
import AuthenticationController from "../../../../Controller/AuthenticationController";
import request from 'supertest';
import RegisterUser from "../../../../../Domains/Entities/Users/RegisterUser";
import databaseHelper from "../../../../../Commons/Helpers/DatabaseHelper";
import Utilities from "../../../../../Commons/Helpers/Utilities";

describe('authentication', () => {
    let app: any;
    beforeAll(() => {
        app = createServer();
        app.use(express.json());
        app.use('/authentications', authenticationRoute(express, AuthenticationController));
    })
    afterEach(async () => {
        await databaseHelper.cleanAllData();
    })
    it('Should have 404 status code when refresh token is wrong', async () => {
        const refreshToken = 'salah';
        const response = await request(app).put('/authentications/').set('Accept', 'application/json').send({
            refreshToken
        });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Refresh token salah');
    })
    it('Should have 403 status code when refresh token is expire', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser(payload);
        const user = await databaseHelper.createUser(userToRegister);
        const refreshToken = Utilities.createToken({
            id: user.id,
            name: user.name,
            username: user.username
        }, 100, 'rahasia');
        await databaseHelper.insertTokenToSpecificUser(refreshToken, user.id);

        const response = await request(app).put('/authentications/').set('Accept', 'application/json').send({refreshToken});
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBeDefined();
    });
    it('Should be able to delete refreshToken', async () => {
        const payload = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '32732825040200021'
        };
        const userToRegister = new RegisterUser(payload);
        const user = await databaseHelper.createUser(userToRegister);
        const refreshToken = Utilities.createToken({
            name: payload.name,
            role: payload.role
        }, 1, 'RAHASIA');
        await databaseHelper.insertTokenToSpecificUser(refreshToken, user.id);
        const findedUser = await databaseHelper.findUserByUsername(payload.username);
        console.log({findedUser});

        const response = await request(app).delete(`/authentications/${findedUser?.authentication?.token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status')
        expect(response.body).toHaveProperty('message')
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Logout success');
        
    })
})