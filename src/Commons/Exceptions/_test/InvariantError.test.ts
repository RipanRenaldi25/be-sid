import ClientError from '../ClientError';
import InvariantError from '../InvariantError';

/**
 * it shuld throw an error with correct message
 * it should throw an error with statuscode when instantiate object
 */

describe('Invariant Error', () => {
    it('it shuld throw an error with correct message', () => {
        const error = new InvariantError('SOME ERROR MESSAGE', 422);
        expect(error.message).toBe('SOME ERROR MESSAGE');

    })
    it('it should throw an error with statuscode when instantiate object', () => {
        const error = new InvariantError('SOME ERROR MESSAGE', 400);
        expect(error.statusCode).toBe(400);
    })
    it('Should throw error with default statuscode', () => {
        const error = new InvariantError('SOME ERROR');

        expect(error.statusCode).toBe(422);
    })
})