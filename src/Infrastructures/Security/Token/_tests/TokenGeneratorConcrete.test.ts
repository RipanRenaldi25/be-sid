import TokenGeneratorConcrete from '../TokenGeneratorConcrete';
import jwt from 'jsonwebtoken';

describe('Token Generator Concrete', () => {
    it('Should be able to generate token correctly', () => {
        const payload = {
            id: 'asd',
            name: 'asd',
            role: 'asd',
            username: 'asd'
        };
        const tokenGenerator = new TokenGeneratorConcrete(jwt);
        const token = tokenGenerator.generateToken(payload);
        const splitedToken = token.split('.');
        
        expect(splitedToken).toHaveLength(3);
        expect(token).toBeDefined();
    })
    it('Should be able to generate refresh token correctly', () => {
        const payload = {
            id: 'asd',
            name: 'asd',
            role: 'asd',
            username: 'asd'
        };

        const tokenGenerator = new TokenGeneratorConcrete(jwt);
        const refreshToken = tokenGenerator.generateRefreshToken(payload, 3);
        const splitedToken = refreshToken.split('.');

        expect(splitedToken).toHaveLength(3);
        expect(refreshToken).toBeDefined();
    })
})