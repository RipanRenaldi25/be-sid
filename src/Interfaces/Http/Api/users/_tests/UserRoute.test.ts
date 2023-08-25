import userRoutes from '../userRoutes';
import UserController from '../../../../Controller/UserController';
import request from 'supertest';
import express from 'express';
import createServer from '../../../../../Infrastructures/Http/Express/CreateServer';
import databaseHelper from '../../../../../Commons/Helpers/DatabaseHelper';
import RegisterUser from '../../../../../Domains/Entities/Users/RegisterUser';
import container from '../../../../../Infrastructures/Container/ServicesContainer';
import RegisterUseCase from '../../../../../Applications/Usecase/RegisterUsecase';

/**
 * Test case
 * /users
 *  /register
 *      * Should return 201 when user register is succeed
 *      * Should return 422 when user payload is not correct
 *      * Should return response property with correct property (id, name, username)
 *      * Should return 400 when username is not available in database
 */

describe('/users', () => {
    let app: express.Express = createServer();
    beforeAll(() => {
        app.use(express.json());
        app.use('/users', userRoutes(express, UserController));
    })
    afterEach(async () => {
        await databaseHelper.cleanAllData();
    })
    describe('/register', () => {
        it('Should return 400 when username is not available in database', async () => {
            const payload = {
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '273282504020002'
            };
            
            const registerUser = new RegisterUser(payload);
            await databaseHelper.createUser(registerUser);

            const response = await request(app).post('/users/register').send(payload).set('Accept', 'application/json');

            console.log('before request');
            
            expect(response.statusCode).toBe(400);
        })
        it('Should return 201 when user register is succeed', async () => {
            // username, passsworld, role, name, nik
        const response = await request(app).post('/users/register').send({
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '3273282504020002'
            });

            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
        });
        it('Should return 422 when user payload is not correct', async() => {
            const response = await request(app).post('/users/register').send({
                username: 'rip',
                password:'asd', // should 6 char,
                role: 'user',
                name: 'test',
            });
            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
        });
        it('Should return response property with correct property (id, name, username)', async () => {
            const response = await request(app).post('/users/register').send({
                username: 'ripanrenaldi',
                password: 'rahasia',
                role: 'user',
                name: 'ripan renaldi',
                nik: '3273282504020002'
            });
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('berhasil membuat user');
            expect(response.body.status).toBe('success');
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.username).toBe('ripanrenaldi');
            expect(response.body.data.name).toBe('ripan renaldi');
        });

    })
})