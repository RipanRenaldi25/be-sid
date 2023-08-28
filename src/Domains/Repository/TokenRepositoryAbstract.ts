abstract class TokenRepositoryAbstract {
    async checkValidRefreshToken (refreshToken: string): Promise<{id: string, name: string, role: string, username: string}> {
        throw new Error('TOKEN_REPOSITORY.CHECK_VALID_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED')
    }
    async deleteRefreshToken(refreshToken: string): Promise<void> {
        throw new Error('TOKEN_REPOSITORY.DELETE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
}

export default TokenRepositoryAbstract;