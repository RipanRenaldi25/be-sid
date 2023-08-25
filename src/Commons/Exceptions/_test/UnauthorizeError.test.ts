import UnauthorizeError from '../UnauthorizeError';

describe('Unauthorize Error', () => {
    it('Should have 401 status code', () => {
        const error = new UnauthorizeError('gagal');
        expect(error.statusCode).toBe(401);
    })
});