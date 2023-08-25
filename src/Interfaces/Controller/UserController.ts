/* istanbul ignore file */
import ClientError from '../../Commons/Exceptions/ClientError';
import RegisterUseCase from '../../Applications/Usecase/RegisterUsecase';
import container from '../../Infrastructures/Container/ServicesContainer';

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
                    username: newUser.username
                }
            });

        }catch(err){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                })
            }
        }
        
    }
}

export default UserController;