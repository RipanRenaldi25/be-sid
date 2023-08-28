import TokenRepositoryAbstract from "../../../Domains/Repository/TokenRepositoryAbstract";
import TokenGeneratorAbstract from "../../Security/TokenGeneratorAbstract";
import UpdateAccessTokenUseCase from "../UpdateAccessToken";

/**
 * test case
 * it should be able to orhcestrate usecase correctly
 */

class TokenRepositoryConcrete extends TokenRepositoryAbstract {
    async checkValidRefreshToken(refreshToken: string): Promise<{ id: string; name: string; role: string; username: string; }> {
        throw new Error();
    }
    async deleteRefreshToken(refreshToken: string): Promise<void> {
        throw new Error();
    }
}

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    generateToken(payload: { id: string; username: string; role: string; }, secretToken: string, expireInHour?: number | undefined) {
        throw new Error();
    }
    generateRefreshToken(payload: { id: string; username: string; role: string; }, expireInHour: number, secretToken: string): string {
        throw new Error();
    }
    checkExpireOfRefreshToken(refreshToken: string): void {
        throw new Error();
    }
}

describe('UpdateAccessTokenUseCase', () => {
    it('it should be able to orhcestrate usecase correctly', async () => {
        const refreshToken = 'asd.dsa.32ass';
        const mockNewAccessToken = 'asda.dsaa.32assa'
        const newPayloadUser = {
            id: 'user-asdsa',
            name: 'nama saya',
            role: 'user',
            username: 'ripanrenaldi'
        }
        const tokenRepository = new TokenRepositoryConcrete();
        const tokenGenerator = new TokenGeneratorConcrete();
        
        const updateAccessTokenUseCase = new UpdateAccessTokenUseCase({
            tokenRepository,
            tokenGenerator
        });

        tokenRepository.checkValidRefreshToken = jest.fn().mockImplementation(() => Promise.resolve(newPayloadUser));
        tokenGenerator.generateToken = jest.fn().mockImplementation(() => Promise.resolve(mockNewAccessToken)); 
        tokenGenerator.checkExpireOfRefreshToken = jest.fn().mockImplementation(() => Promise.resolve(refreshToken));

        const newToken: string = await updateAccessTokenUseCase.execute(refreshToken);
        const splitedNewToken = newToken.split('.');

        expect(newToken).toBeDefined();
        expect(splitedNewToken).toHaveLength(3);
        expect(tokenRepository.checkValidRefreshToken).toHaveBeenCalledWith(refreshToken);
        expect(tokenGenerator.generateToken).toHaveBeenCalledWith(newPayloadUser, 'TOKEN_RAHASIA', 1);
        expect(tokenGenerator.checkExpireOfRefreshToken).toHaveBeenCalledWith(refreshToken, 'SECRET_TOKEN_RAHASIA');
    })
})