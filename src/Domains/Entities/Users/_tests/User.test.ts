import IUser from '../Interface/UserInterface';
import RegularUser from '../RegisterUser';

/**
 * Should throw an error if password length < 6 character
 * Should throw an error if username length < 3 character
 * Should have correct property when instantiate object
 * Should invoke validate method when instantiate an object
 */

describe('Test', () => {
    it('Should throw an error if password length < 6 character', () => {
        expect(() => new RegularUser({username: 'asd', password: 'asd', role: 'user', name:'ripan renaldi', nik: '123123'})).toThrowError();
    })
    it('Should throw an error if username length < 3 character', () => {
        expect(() => new RegularUser({username: 'a', password: 'asd', role: 'user', name:'ripan renaldi', nik: '123123'})).toThrowError();
    })
    it('Should have correct property when instantiate object', () => {
        // arrange
        const payload: IUser = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        
        const userToRegister = new RegularUser(payload);

        expect(userToRegister).toHaveProperty('username');
        expect(userToRegister).toHaveProperty('password');
        expect(userToRegister).toHaveProperty('role');
        expect(userToRegister).toHaveProperty('name');
        expect(userToRegister.username).toBe(payload.username);
        expect(userToRegister.password).toBe(payload.password);
        expect(userToRegister.role).toBe(payload.role);
        expect(userToRegister.name).toBe(payload.name);
        expect(userToRegister.nik).toBe(payload.nik);
    })
    it('Should invoke validate method when instantiate an object', () => {
        // arrange
        const payload: IUser = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        
        const spyValidateMethod = jest.spyOn(RegularUser.prototype, 'validate');
        new RegularUser(payload);

        expect(spyValidateMethod).toHaveBeenCalledTimes(1);
        expect(spyValidateMethod).toHaveBeenCalledWith(payload);
    })
    it('Should update private property correctly', () => {
        const payload: IUser = {
            username: 'ripanrenaldi',
            password: 'rahasia',
            role: 'user',
            name: 'ripan renaldi',
            nik: '123123'
        };
        
        const newUser = new RegularUser(payload);
        newUser.name = 'nama baru';
        newUser.password = 'password baru';
        newUser.role = 'role baru';
        newUser.username = 'username baru';
        newUser.nik = 'nik baru'

        expect(newUser.name).not.toBe(payload.name);
        expect(newUser.username).not.toBe(payload.username);
        expect(newUser.password).not.toBe(payload.password);
        expect(newUser.role).not.toBe(payload.role);
        expect(newUser.nik).not.toBe(payload.nik);
    })
})