import PasswordHashAbstract from '../PasswordHash';


class PasswordHash extends PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }
    async comparePassword(password: string, passwordHash: string): Promise<boolean>{
        throw new Error('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }
}

describe('Password Hash Abstract', () => {
    it('Should throw error when invoke method hash', async () => {
        const passwordHash = new PasswordHash();
        expect(() => passwordHash.hash('asd')).rejects.toThrowError('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    })
    it('Should throw error when invoke method compare', () => {
        const passwordHash = new PasswordHash();
        expect(() => passwordHash.comparePassword('asd', 'kajsdkas')).rejects.toThrowError('ABSTACT_CLASS.METHOD_NOT_IMPLEMENTED');
    })
})