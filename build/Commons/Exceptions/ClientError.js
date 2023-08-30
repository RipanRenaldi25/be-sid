"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        if (this.constructor.name === 'ClientError') {
            throw new Error('EXCEPTIONS_ERROR.CANNOT_INSTANTIATE_ABSTRACT_CLASS');
        }
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
exports.default = ClientError;
