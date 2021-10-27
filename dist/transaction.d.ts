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
    constructor(fromAddress: any, toAddress: any, amount: any);
}
export default Transaction;
