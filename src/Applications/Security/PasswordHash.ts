/* istanbul ignore file */
abstract class PasswordHashAbstract {
    async hash(password: string): Promise<string> {
        throw new Error('ABSTRACT_CLASS.METHOD_NOT_IMPLEMENTED');
    }
};

export default PasswordHashAbstract;