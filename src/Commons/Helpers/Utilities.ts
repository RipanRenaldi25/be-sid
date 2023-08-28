import jwt from 'jsonwebtoken';

const Utilities = {
    createToken(payload: any, expireInSeconds: number, secretToken: string) {
        return jwt.sign(payload, secretToken, {
            expiresIn: expireInSeconds
        });
    },
    
}

export default Utilities;