declare const SHA256: any;
declare class Block {
    constructor(timestamp: any, transactions: any, previousHash?: string);
    calculateHash(): any;
    mineBlock(difficulty: any): void;
}
