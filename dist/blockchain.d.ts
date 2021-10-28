import Block from "./block";
declare class Blockchain {
    chain: any;
    difficulty: any;
    pendingTransactions: any;
    miningReward: any;
    constructor();
    createGenesisBlock(): Block;
    getLatestBlock(): any;
    minePendingTransactions(minerAddress: string): void;
    minePendingTransactionsClient(minerAddress: string, minerSolution: any, result: any): void;
    addTransaction(transaction: any): void;
    getBalanceOfAddress(address: string): number;
    isChainValid(): boolean;
    getAllTransactions(): any;
}
export default Blockchain;
