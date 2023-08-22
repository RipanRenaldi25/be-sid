/* istanbul ignore file */
abstract class ClientError extends Error {
    constructor(message: string, public statusCode: number = 400){
        super(message);

        if(this.constructor.name === 'ClientError'){
            throw new Error('EXCEPTIONS_ERROR.CANNOT_INSTANTIATE_ABSTRACT_CLASS');
        }
        this.statusCode = statusCode;
        this.name = 'ClientError'
    }
}

export default ClientError;