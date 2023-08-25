import TokenGeneratorAbstract from "../../../Applications/Security/TokenGeneratorAbstract";

class TokenGeneratorConcrete extends TokenGeneratorAbstract {
    jwt: any
    constructor (jwt: any) {
        super();
        this.jwt = jwt;
    }

    generateToken(payload: { id: string; username: string; role: string; }, secretToken: string = 'TOKEN_RAHASIA') {
        const token = this.jwt.sign(payload, secretToken, {
            expiresIn: '1h'
        });

        return token;
    }
    
}

export default TokenGeneratorConcrete;