import UserLogedIn, { UserLogedInType } from '../UserLogedIn';

/**
 * it should create user loged in instances with correct property
 */

describe('User Loged In', () => {
    it('it should create user loged in instances with correct property', () => {
        const payload: UserLogedInType = {
            id: 'user-123',
            name: 'ripan renaldi',
            token: 'SECRET ACCESS TOKEN',
            role: 'admin'
        }
        const credentialUser = new UserLogedIn(payload);
        
        expect(credentialUser).toHaveProperty('id');
        expect(credentialUser).toHaveProperty('name');
        expect(credentialUser).toHaveProperty('token');
        expect(credentialUser).toHaveProperty('role');
        expect(credentialUser.id).toBe(payload.id)
        expect(credentialUser.name).toBe(payload.name)
        expect(credentialUser.token).toBe(payload.token)
        expect(credentialUser.role).toBe(payload.role)
    });
    it('Should update data correctly using setter and getter', () => {
        const payload: UserLogedInType = {
            id: 'user-123',
            name: 'ripan renaldi',
            token: 'SECRET ACCESS TOKEN',
            role: 'admin'
        }
        const credentialUser = new UserLogedIn(payload);
        credentialUser.token = 'NEW ACCESS TOKEN';
        
        expect(credentialUser).toHaveProperty('id');
        expect(credentialUser).toHaveProperty('name');
        expect(credentialUser).toHaveProperty('token');
        expect(credentialUser.id).toBe(payload.id)
        expect(credentialUser.name).toBe(payload.name)
        expect(credentialUser.token).not.toBe(payload.token)

    })
})