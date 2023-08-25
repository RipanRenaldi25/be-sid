import PasswordHashAbstract from "../../../Applications/Security/PasswordHash";
import UnauthorizeError from "../../../Commons/Exceptions/UnauthorizeError";

class PasswordHashConcrete extends PasswordHashAbstract {
    bcrypt: any;
    saltRound: any

    constructor(bcrypt: any, saltRound: number = 10){
        super();
        this.bcrypt = bcrypt;
        this.saltRound = saltRound;
    }

    async hash(password: string): Promise<string> {
        const newPassword = await this.bcrypt.hash(password, this.saltRound);
        return newPassword; 
    }
    comparePassword(password: string, passwordHashed: string): Promise<boolean> {
        const isMatch = this.bcrypt.compare(password, passwordHashed)
        if(!isMatch){
            throw new UnauthorizeError('Username atau password salah');
        }
        return isMatch;
    }
}

export default PasswordHashConcrete