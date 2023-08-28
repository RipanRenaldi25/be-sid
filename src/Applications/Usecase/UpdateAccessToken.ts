import TokenGeneratorAbstract from "../Security/TokenGeneratorAbstract"
import TokenRepositoryAbstract from "../../Domains/Repository/TokenRepositoryAbstract"
import UserLogedIn from "../../Domains/Entities/Users/UserLogedIn"

type PayloadUser = {
    id: string,
    username: string,
    name: string,
    role: string
}

class UpdateAccessTokenUseCase {
    tokenGenerator: TokenGeneratorAbstract
    tokenRepository: TokenRepositoryAbstract

    constructor({tokenGenerator, tokenRepository}: {tokenGenerator: TokenGeneratorAbstract, tokenRepository: TokenRepositoryAbstract}){
        this.tokenGenerator = tokenGenerator;
        this.tokenRepository = tokenRepository;
    }

    async execute(refreshToken: string): Promise<string> {
        const payload: PayloadUser = await this.tokenRepository.checkValidRefreshToken(refreshToken);
        this.tokenGenerator.checkExpireOfRefreshToken(refreshToken, process.env.SECRET_REFRESH_TOKEN || 'SECRET_TOKEN_RAHASIA');
        const newAccessToken = this.tokenGenerator.generateToken(payload, process.env.SECRET_TOKEN! || 'TOKEN_RAHASIA', 1);
        return newAccessToken;
    }
}

export default UpdateAccessTokenUseCase