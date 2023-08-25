import UserLogedIn from "../../Domains/Entities/Users/UserLogedIn";
import UserRepositoryAbstract from "../../Domains/Repository/UserRepositoryAbstract";
import TokenGeneratorAbstract from "../Security/TokenGeneratorAbstract";

class LoginUsecase {
    userRepository: UserRepositoryAbstract
    tokenGenerator: TokenGeneratorAbstract
    
    constructor({userRepository, tokenGenerator}: {userRepository: UserRepositoryAbstract, tokenGenerator: TokenGeneratorAbstract}) {
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
    }

    async execute(payload: {username: string, password: string}) {
        let token;
        const {username, password} = payload;
        await this.userRepository.checkUserOnDatabase(username);
        const user = await this.userRepository.login({username, password});
        if(!process.env.SECRET_TOKEN) {
            token = this.tokenGenerator.generateToken({
                id: user.id,
                role: user.role,
                username,
            }, 'TOKEN_RAHASIA');
        }else{
            token = this.tokenGenerator.generateToken({
                id: user.id,
                role: user.role,
                username,
            }, process.env.SECRET_TOKEN);
        }
        return new UserLogedIn({
            id: user.id,
            role: user.role,
            name: user.name,
            token
        });
    }
}

export default LoginUsecase;