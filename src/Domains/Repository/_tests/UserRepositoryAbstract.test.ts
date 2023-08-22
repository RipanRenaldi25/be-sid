import IUser from '../../Entities/Users/Interface/UserInterface';
import RegisterUser from '../../Entities/Users/RegisterUser';
import RegisteredUser from '../../Entities/Users/RegisteredUser';
import UserLogedIn from '../../Entities/Users/UserLogedIn';
import UserRepositoryAbstract from '../UserRepositoryAbstract';

/**
 * it should return awaited value when register user
 */


describe('User Repository Abstract', () => {
    it('it should return awaited value when register user', () => {
        const UserRepository = new UserRepositoryAbstract();
        expect(() => UserRepository.login({username: 'ripanrenaldi', password: 'rahasia'})).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
        expect(() => UserRepository.register(new RegisterUser({username: 'ripanrenaldi', password: 'rahasia', name: 'ripanrenaldi', role: 'admin', nik: '123123'}))).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
        expect(() => UserRepository.verifyAvailableUsername('asd')).rejects.toThrowError('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED')
    })

})