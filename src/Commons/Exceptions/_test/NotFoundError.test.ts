import NotFoundError from '../NotFoundError';

describe('Not found error', () => {
    it('Should return 404', () => {
        const notFoundError = new NotFoundError('Tidak ditemukan');
        expect(notFoundError.statusCode).toBe(404);
    })
})