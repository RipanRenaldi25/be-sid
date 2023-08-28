import ClientError from "./ClientError";

class ForbiddenError extends ClientError {
    constructor(message: string) {
        super(message, 403);
    }
};

export default ForbiddenError;