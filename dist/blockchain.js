"use strict";
// const Transaction = require('./transaction')
// const Block = require("./block");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __importDefault(require("./transaction"));
var block_1 = __importDefault(require("./block"));
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    Blockchain.prototype.createGenesisBlock = function () {
        return new block_1.default("2021/01/01", [], "0");
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.minePendingTransactions = function (miningRewardAddress) {
        var block = new block_1.default(Date.now(), this.pendingTransactions); // currently we are just mining all the transactions that are pending
        block.mineBlock(this.difficulty);
        console.log("Block successfully mined!");
        this.chain.push(block);
        // create a new transaction(a reward for the solver of the previous block)
        this.pendingTransactions = [
            new transaction_1.default(null, miningRewardAddress, this.miningReward)
        ];
    };
    Blockchain.prototype.createTransaction = function (transaction) {
        this.pendingTransactions.push(transaction);
    };
    Blockchain.prototype.getBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (address === trans.fromAddress) {
                    balance -= trans.amount;
                }
                if (address === trans.toAddress) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    };
    Blockchain.prototype.isChainValid = function () {
        // traverse the entire blockchain and verify that the blocks are linked properly
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            // confirms the hash of every block using its own data
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
    return Blockchain;
}());
exports.default = Blockchain;
//# sourceMappingURL=blockchain.js.map