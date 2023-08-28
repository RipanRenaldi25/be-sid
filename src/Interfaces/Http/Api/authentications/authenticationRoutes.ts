const authenticationRoute = (express: any, controller: any) => {
    const router = express.Router();
    router.put('/', controller.updateRefreshToken);
    router.delete('/:refreshToken', controller.deleteRefreshToken);
    return router;
};

export default authenticationRoute;