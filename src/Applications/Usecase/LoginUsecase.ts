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
        await this.userRepository.deleteUserTokenIfExists(username);
        await this.userRepository.login({username, password});
        const user = await this.userRepository.getUserByUsername(username);
        const token = this.tokenGenerator.generateToken({
            id: user!.id,
            role: user!.role,
            username,
        }, process.env.SECRET_TOKEN! || 'TOKEN_RAHASIA');
        const refreshToken = this.tokenGenerator.generateRefreshToken({
            id: user!.id,
            role: user!.role,
            username,
        }, 9, process.env.SECRET_REFRESH_TOKEN! || 'REFRESH_TOKEN_RAHASIA');
        await this.userRepository.insertRefreshToken(refreshToken, user!.id);
        const returnedUser: Pick<UserLogedIn, 'id' | 'name' | 'role' | 'token'> & {
            username: string,
            refreshToken: string
        } = {
            id: user!.id,
            role: user!.role,
            name: user!.name,
            username,
            token,
            refreshToken
        }
        return returnedUser;
    }
}

export default LoginUsecase;