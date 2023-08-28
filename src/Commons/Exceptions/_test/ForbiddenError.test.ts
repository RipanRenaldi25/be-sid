import ForbiddenError from '../ForbiddenError';

describe('Forbidden Error', () => {
    it('Should have status code 403', () => {
        const forbiddenError = new ForbiddenError('');
        expect(forbiddenError.statusCode).toBe(403);
    })
    it('Should throw with correct message', () => {
        const forbiddenError = new ForbiddenError('error');
        expect(forbiddenError.message).toBe('error')
    })
});