import jwt from 'jsonwebtoken';

const Utilities = {
    createToken(payload: any, expireInSeconds: number, secretToken: string) {
        return jwt.sign(payload, secretToken, {
            expiresIn: expireInSeconds
        });
    },

    getFileNameAndExtension(fileName: string) {
        const splitedFile = fileName.split('.');
        const fileExtension = splitedFile[splitedFile.length - 1];
        const originalFileName = splitedFile.slice(0, splitedFile.length - 1);

        return [originalFileName, fileExtension];
    },
    getAccessToken(token: string) {
        const [,accessToken] = token.split(' ');
        return accessToken;
    }
    
}

export default Utilities;