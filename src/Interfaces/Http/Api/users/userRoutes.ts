import express from 'express';

const userRoutes = (express: any, controller: any) => {
    const router:any =  express.Router();
    
    router.get('/', (req: any, res: any) => {
        res.send('test');
    })
    router.post('/register', controller.createUser);
    router.post('/login', controller.login);

    return router;
}

export default userRoutes;