import ClientError from "./ClientError";

class InvariantError extends ClientError {
    constructor(message: string, statusCode: number = 422) {
        super(message, statusCode);
        this.statusCode = statusCode;
    }
}

export default InvariantError;