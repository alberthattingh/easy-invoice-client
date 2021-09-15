export interface BankingDetails {
    accountId?: number;
    accountHolder: string;
    accountType: string;
    accountNumber: string;
    bank: string;
    branchCode: string;
    paymentInstruction: string;
    isActive: boolean;
}
