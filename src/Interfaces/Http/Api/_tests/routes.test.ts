import request from 'supertest';
import {Express, Router} from 'express';
import express from 'express';
import routes from '../routes';
import createServer from '../../../../Infrastructures/Http/Express/CreateServer';

describe('Routes', () => {
    let app: Express = routes(express, createServer());
    describe('/', () => {
        it('Should be able to show message SID Document Management API', async () => {
            const response = await request(app).get('/');

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('SID Document Management API');
        })
    })
})