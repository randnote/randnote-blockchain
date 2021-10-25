import Block from './block';
declare class Blockchain {
    chain: any;
    difficulty: any;
    pendingTransactions: any;
    miningReward: any;
    constructor();
    createGenesisBlock(): Block;
    getLatestBlock(): any;
    minePendingTransactions(miningRewardAddress: any): void;
    createTransaction(transaction: any): void;
    getBalanceOfAddress(address: any): number;
    isChainValid(): boolean;
}
export default Blockchain;
