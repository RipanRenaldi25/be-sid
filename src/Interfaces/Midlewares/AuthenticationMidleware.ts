import express, { NextFunction } from 'express';
import Utilities from '../../Commons/Helpers/Utilities';
import UnauthorizeError from '../../Commons/Exceptions/UnauthorizeError';
import jwt from 'jsonwebtoken';
import ClientError from '../../Commons/Exceptions/ClientError';

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
};

const authenticationMidleware = (req: express.Request, res: express.Response, next: NextFunction) => {
    try{
        const bearerToken: string | undefined = req.headers.authorization;
        if(!bearerToken) {
            throw new UnauthorizeError('Unauthorize user');
        }else {
            const accessToken = Utilities.getAccessToken(bearerToken);
            const userPayload = jwt.verify(accessToken, process.env.SECRET_TOKEN || '');
            req.user = userPayload;
        }
        next();
    }catch(err: any){
        if(err instanceof ClientError){
            res.status(err.statusCode).json({
                status: 'fail',
                message: err.message
            })
        }else {
            res.status(500).json({
                status: 'fail',
                message: `error ${err.message}`
            })
        }
    }
};

export default authenticationMidleware;