/* istanbul ignore file */
import express from 'express';
import container from '../../Infrastructures/Container/ServicesContainer';
import UpdateAccessTokenUseCase from '../../Applications/Usecase/UpdateAccessToken';
import ClientError from '../../Commons/Exceptions/ClientError';
import TokenRepositoryConcrete from '../../Infrastructures/Repository/TokenRepositoryConcrete';

class AuthenticationController {
    static async updateRefreshToken(req: express.Request, res: express.Response) {
        try{
            const { refreshToken } = req.body;
            const updateAccessTokenUsecase = container.getInstance(UpdateAccessTokenUseCase.name);
            const newToken = await updateAccessTokenUsecase.execute(refreshToken);
            res.status(200).json({
                status: 'success',
                message: 'Refresh token updated',
                accessToken: newToken
            })
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
                return;
            }
            res.status(500).json({
                status: 'fail',
                message: `Server error ${err.message}`
            })
        }
    }

    static async deleteRefreshToken(req: express.Request, res: express.Response) {
        try{
            const { refreshToken } = req.params;
            console.log({refreshToken});
            const tokenRepository: TokenRepositoryConcrete = container.getInstance(TokenRepositoryConcrete.name);
            await tokenRepository.deleteRefreshToken(refreshToken);
            res.status(200).json({
                status: 'success',
                message: 'Logout success'
            });
        }catch(e: any){
            if(e instanceof ClientError){
                res.status(e.statusCode).json({
                    status: 'fail',
                    message: e.message
                })
            }else {
                res.status(500).json({
                    status: 'fail',
                    message: `error ${e.message}`
                })
            }
        }
    }
}

export default AuthenticationController;