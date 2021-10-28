export interface TransactionInterface {
    timestamp?: string;
    fromAddress: string;
    privateKey?: string;
    toAddress: string;
    amount: number;
}
declare class Transaction {
    timestamp: any;
    fromAddress: any;
    toAddress: any;
    amount: number;
    signature: string;
    constructor(fromAddress: any, toAddress: any, amount: any);
    calculateHash(): any;
    signTransaction(signingKey: any): void;
    isValid(): any;
}
export default Transaction;
