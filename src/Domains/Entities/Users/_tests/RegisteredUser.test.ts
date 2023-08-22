import RegisteredUser from '../RegisteredUser';
import { RegisteredUserType } from '../RegisteredUser';

/**
 * it should update props with getter and setter
 */

describe('Registered User', () => {
    it('it should update props with getter and setter', () => {
        const payload: RegisteredUserType = {
            id: 'user-123',
            name: 'user ripan',
            username: 'ripanrenaldi',
        };
        
        const registeredUser = new RegisteredUser(payload);
        registeredUser.id = 'user-321';
        registeredUser.name = 'ripan';
        registeredUser.username = 'ripanrenaldi2';

        expect(registeredUser.id).not.toBe(payload.id);
        expect(registeredUser.name).not.toBe(payload.name);
        expect(registeredUser.username).not.toBe(payload.username);
    })
})