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
})