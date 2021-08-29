export default interface UserModel {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    cell?: string;
    defaultFee?: number;
    logo?: string;
    userPassword?: string;

    token?: string;
}
