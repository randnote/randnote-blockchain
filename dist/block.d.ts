declare class Block {
    index: any;
    block: any;
    data: any;
    timestamp: any;
    transactions: any;
    previousHash: any;
    hash: any;
    nonce: any;
    constructor(timestamp: any, transactions: any, previousHash?: string);
    calculateHash(): any;
    mineBlock(difficulty: any): void;
}
export default Block;
