import UnauthorizeError from '../../../../Commons/Exceptions/UnauthorizeError';
import PasswordHashConcrete from '../PasswordHashConcrete';
import bcrypt from 'bcrypt';


describe('Password Hash Concrete', () => {
    it('Should hash correctly', async () => {
        const passwordHash = new PasswordHashConcrete(bcrypt);
        const password = 'rahasia';
        const newPassword = await passwordHash.hash(password);

        expect(newPassword).toBeDefined();
        expect(newPassword).not.toBe(password);
    })
    it('Should compare password corrcetly', async () => {
        const passwordHash = new PasswordHashConcrete(bcrypt);
        const password = 'rahasia';
        passwordHash.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true));

        // action
        await passwordHash.comparePassword(password, 'asdasd');

        expect(passwordHash.comparePassword).toHaveBeenCalledWith(password, 'asdasd');
        await expect(passwordHash.comparePassword).toHaveBeenCalledTimes(1);
    })
    it('Should throw unauthorize error when password is not match', async () => {
        const passwordHash = new PasswordHashConcrete(bcrypt);
        const password = 'rahasia2';
        const encryptedPassword = await bcrypt.hash('password', 10);

        await expect(() => passwordHash.comparePassword(password, encryptedPassword)).rejects.toThrowError(UnauthorizeError);
    })
});
