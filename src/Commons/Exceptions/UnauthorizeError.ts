import ClientError from "./ClientError";

class UnauthorizeError extends ClientError {
    constructor(message: string) {
        super(message, 401);
    }
}

export default UnauthorizeError