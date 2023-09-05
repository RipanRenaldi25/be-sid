/* istanbul ignore file */
import ClientError from '../../Commons/Exceptions/ClientError';
import RegisterUseCase from '../../Applications/Usecase/RegisterUsecase';
import LoginUsecase from '../../Applications/Usecase/LoginUsecase';
import container from '../../Infrastructures/Container/ServicesContainer';
import express from 'express';
import UserRepositoryConcrete from '../../Infrastructures/Repository/UserRepositoryConcrete';

class UserController {
    static async createUser(req: any, res: any){
        try{
            const payload = req.body;
            const registerUseCase: RegisterUseCase = container.getInstance(RegisterUseCase.name);
            const newUser = await registerUseCase.execute(payload);
            res.status(201).json({
                status: 'success',
                message: 'berhasil membuat user',
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    username: newUser.username,
                }
            });

        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                })
            }else {
                res.status(500).json({
                    status: 'fail',
                    message: `Server error ${err.message}`
                })
            }
        }
        
    }
    static async login(req: any, res: any) {
        try{
            const {username, password} = req.body;
            const loginUsecase = container.getInstance(LoginUsecase.name);
            const user = await loginUsecase.execute({username, password});
            console.log({user: user.id});
            res.status(200).json({
                status: 'success',
                message: 'berhasil login',
                data: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    username,
                    accessToken: user.token,
                    refreshToken: user.refreshToken
                }
            });
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: 'Username atau password salah'
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `SERVER ERROR : ${err.message}`
                })
            }
        }

    }
    static async getUsers (req: express.Request, res: express.Response) {
        try{
            const userRepository = container.getInstance(UserRepositoryConcrete.name);
            const users = await userRepository.getUsers();

            res.status(200).json({
                status: 'success',
                message: 'Users found',
                data: users
            })
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: 'Username atau password salah'
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `SERVER ERROR : ${err.message}`
                })
            }
        }
    }

    static async getUserByNik(req: express.Request, res: express.Response) {
        try{
            const { nik } = req.params;
            const userRepository = container.getInstance(UserRepositoryConcrete.name);
            const user = await userRepository.getUserByNIK(nik);

            res.status(200).json({
                status: 'success',
                message: 'User found',
                data: user
            })
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: 'Username atau password salah'
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `SERVER ERROR : ${err.message}`
                })
            }
        }
    }
}

export default UserController;