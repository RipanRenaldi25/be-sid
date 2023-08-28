import ForbiddenError from '../../../Commons/Exceptions/ForbiddenError';
import TokenGenerator from '../TokenGeneratorAbstract';

class TokenGeneratorConcrete extends TokenGenerator {
    generateToken(payload: { id: string; username: string; role: string; }, secretToken: string, expireInHour?: number | undefined) {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.GENERATE_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    generateRefreshToken(payload: { id: string; username: string; role: string; }, expireInHour: number, secretToken: string): string {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.GENERATE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    }
    checkExpireOfRefreshToken(refreshToken: string, secretToken: string): void {
        throw new Error('TOKEN_GENERATOR_ABSTRACT.CHECK_EXPIRE_OF_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
        
    }
}

describe('Token Generator', () => {
    it('should throw an error when invoke method generateToken', () => {
        expect(() => new TokenGeneratorConcrete().generateToken({id: 'asd', role: 'asd', username: 'asd'}, 'asd', 1)).toThrowError('TOKEN_GENERATOR_ABSTRACT.GENERATE_TOKEN_METHOD_NOT_IMPLEMENTED');
    })
    it('Should trow error when method generate refresh token invoke', () => {
        expect(() => new TokenGeneratorConcrete().generateRefreshToken({id: 'asd', role: 'asd', username: 'asd'}, 3, 'asd')).toThrowError('TOKEN_GENERATOR_ABSTRACT.GENERATE_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    })
    it('Should throw error when method checkExpireOfRefreshToken invoke', () => {
        expect(() => new TokenGeneratorConcrete().checkExpireOfRefreshToken('asd', 'asd')).toThrowError('TOKEN_GENERATOR_ABSTRACT.CHECK_EXPIRE_OF_REFRESH_TOKEN_METHOD_NOT_IMPLEMENTED');
    })
})