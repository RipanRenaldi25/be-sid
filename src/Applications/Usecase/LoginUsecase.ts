import UserLogedIn from "../../Domains/Entities/Users/UserLogedIn";
import UserRepositoryAbstract, { UserWithRoleType } from "../../Domains/Repository/UserRepositoryAbstract";
import TokenGeneratorAbstract from "../Security/TokenGeneratorAbstract";

class LoginUsecase {
    userRepository: UserRepositoryAbstract
    tokenGenerator: TokenGeneratorAbstract
    
    constructor({userRepository, tokenGenerator}: {userRepository: UserRepositoryAbstract, tokenGenerator: TokenGeneratorAbstract}) {
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
    }

    async execute(payload: {username: string, password: string}) {
        const {username, password} = payload;
        await this.userRepository.checkUserOnDatabase(username);
        await this.userRepository.login({username, password});
        const user = await this.userRepository.getUserByUsername(username);
        const token = this.tokenGenerator.generateToken({
            id: user!.id,
            role: user!.role,
            username,
        }, process.env.SECRET_TOKEN! || 'TOKEN_RAHASIA');
        const returnedUser: Pick<UserLogedIn, 'id' | 'name' | 'role' | 'token'> & {
            username: string
        } = {
            id: user!.id,
            role: user!.role,
            name: user!.name,
            username,
            token,
        }
        return returnedUser;
    }
}

export default LoginUsecase;