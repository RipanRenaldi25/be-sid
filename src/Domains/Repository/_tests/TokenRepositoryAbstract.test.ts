import TokenRepositoryAbstract from "../TokenRepositoryAbstract";

class TokenRepository extends TokenRepositoryAbstract {
    async checkValidRefreshToken(refreshToken: string): Promise<{ id: string; name: string; role: string; username: string; }> {
        throw new Error('TOKEN_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    async deleteRefreshToken(refreshToken: string): Promise<void> {
        throw new Error('TOKEN_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED')
    }
}


describe('Token Repository Abstract', () => {
    it('Should throw error when invoke function', () => {
        expect(() => new TokenRepository().checkValidRefreshToken('asd')).rejects.toThrowError('TOKEN_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        expect(() => new TokenRepository().deleteRefreshToken('asd')).rejects.toThrowError('TOKEN_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED')
    })
})