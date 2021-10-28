"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHA256 = require("crypto-js/sha256");
var Block = /** @class */ (function () {
    function Block(timestamp, transactions, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    // calc the hash func of the block... creates the hash for our block
    Block.prototype.calculateHash = function () {
        return SHA256(this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce).toString();
    };
    Block.prototype.mineBlock = function (difficulty) {
        console.log("Mining...");
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash); // just displays the hash string
    };
    return Block;
}());
exports.default = Block;
//# sourceMappingURL=block.js.map