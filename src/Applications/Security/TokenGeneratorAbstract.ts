type PayloadType = {
    id: string,
    username: string,
    role: string,
}

abstract class TokenGeneratorAbstract {
    abstract generateToken(payload: PayloadType, secretToken: string, expireInHour?: number): any;
    abstract generateRefreshToken(payload: PayloadType, expireInHour: number, secretToken:string): string
    abstract checkExpireOfRefreshToken(refreshToken: string, secretToken: string): void
}

export default TokenGeneratorAbstract;