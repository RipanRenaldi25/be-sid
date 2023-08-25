import express from 'express';

const userRoutes = (express: any, controller: any) => {
    const router:any =  express.Router();

    router.post('/register', controller.createUser);
    router.get('/', (req: any, res: any) => {
        res.send('test');
    })

    return router;
}

export default userRoutes;