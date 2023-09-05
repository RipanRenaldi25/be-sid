import express from 'express';
import authenticationMidleware from '../../../Midlewares/AuthenticationMidleware';

const userRoutes = (express: any, controller: any) => {
    const router:any =  express.Router();
    router.get('/', authenticationMidleware, controller.getUsers);
    router.get('/user/:nik', authenticationMidleware, controller.getUserByNik)
    router.post('/register', controller.createUser);
    router.post('/login', controller.login);

    return router;
}

export default userRoutes;