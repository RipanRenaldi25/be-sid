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
});
