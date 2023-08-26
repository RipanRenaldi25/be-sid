import TokenGeneratorAbstract from "../../../Applications/Security/TokenGeneratorAbstract";

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    jwt: any
    constructor (jwt: any) {
        super();
        this.jwt = jwt;

        this.generateRefreshToken = this.generateRefreshToken.bind(this);
    }

    
    generateToken(payload: { id: string; username: string; role: string; }, secretToken: string = 'TOKEN_RAHASIA', expireInHour?: number) {
        let token;
        if(expireInHour){
            token = this.jwt.sign(payload, secretToken, {
                expiresIn: 3600 * expireInHour
            });
            return token;
        }
        token = this.jwt.sign(payload, secretToken, {
            expiresIn: 3600 * 1
        });
    
        return token;
        
    }

    generateRefreshToken(payload: { id: string; username: string; role: string; }, expiresInHour: number, secretToken: string = 'REFRESH_TOKEN_RAHASIA'){
        const refreshToken = this.generateToken(payload, secretToken, expiresInHour);

        return refreshToken;
    }
    
}

export default TokenGeneratorConcrete;