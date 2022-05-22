import Block from "./block";
declare class Blockchain {
    chain: any;
    difficulty: any;
    pendingTransactions: any;
    miningReward: any;
    supply: number;
    constructor();
    createGenesisBlock(): Block;
    getLatestBlock(): any;
    minePendingTransactions(minerAddress: string): void;
    minePendingTransactionsClient(minerAddress: string, minerSolution: any, result: any): Promise<void>;
    addTransaction(transaction: any): void;
    addTransactionClient(transaction: any, result: any): void;
    getBalanceOfAddress(address: string): number;
    isChainValid(): boolean;
    getAllTransactions(): any;
    getBlockchain(result: any): void;
    getPendingTransactions(): any;
    getSupply(): number;
}
export default Blockchain;
