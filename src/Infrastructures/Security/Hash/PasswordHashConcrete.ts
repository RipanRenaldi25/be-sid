import PasswordHashAbstract from "../../../Applications/Security/PasswordHash";

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
}

export default PasswordHashConcrete