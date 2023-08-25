type PayloadType = {
    id: string,
    username: string,
    role: string,
}

abstract class TokenGeneratorAbstract {
    abstract generateToken(payload: PayloadType, secretToken: string): any;
}

export default TokenGeneratorAbstract;