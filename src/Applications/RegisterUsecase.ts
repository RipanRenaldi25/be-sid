import IUser from "../Domains/Entities/Users/Interface/UserInterface";
import RegisterUser from "../Domains/Entities/Users/RegisterUser";
import RegisteredUser from "../Domains/Entities/Users/RegisteredUser";
import UserRepositoryAbstract from "../Domains/Repository/UserRepositoryAbstract";
import PasswordHashAbstract from "./Security/PasswordHash";

class RegisterUseCase {
    userRepository: UserRepositoryAbstract;
    passwordHash: PasswordHashAbstract
    
    constructor({userRepository, passwordHash}: {userRepository: UserRepositoryAbstract, passwordHash: PasswordHashAbstract}){
        this.userRepository = userRepository;
        this.passwordHash = passwordHash;
    };

    async execute(payload: IUser): Promise<RegisteredUser> {
        const userToRegister = new RegisterUser(payload);
        await this.userRepository.verifyAvailableUsername(userToRegister.username);
        userToRegister.password = await this.passwordHash.hash(userToRegister.password);
        const registeredUser = await this.userRepository.register(userToRegister);

        return registeredUser;
    }
}

export default RegisterUseCase