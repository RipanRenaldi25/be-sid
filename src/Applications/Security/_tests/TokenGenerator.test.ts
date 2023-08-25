import TokenGenerator from '../TokenGeneratorAbstract';

class TokenGeneratorConcrete extends TokenGenerator {
    generateToken(): void {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }
}

describe('Token Generator', () => {
    it('should throw an error when invoke method generateToken', () => {
        expect(() => new TokenGeneratorConcrete().generateToken()).toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
    })
})