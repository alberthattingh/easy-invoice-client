import { BankingDetails } from './banking-details';

export default interface UserModel {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    cell?: string;
    defaultFee?: number;
    logoUrl?: string;
    logoName?: string;
    userPassword?: string;
    bankingDetails?: BankingDetails[];
    accountDetails?: BankingDetails[];

    token?: string;
}
