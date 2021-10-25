"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockchain_1 = require("./blockchain");
var transaction_1 = require("./transaction");
var coin = new blockchain_1.default();
coin.createTransaction(new transaction_1.default('address1', 'romeo', 100));
// coin.createTransaction(new Transaction('romeo', 'address3', 30 ))
console.log('\n Starting the miner...');
coin.minePendingTransactions('Romeo');
console.log('\n Balance of Romeo is: ' + coin.getBalanceOfAddress('romeo'));
// create a second transaction:
coin.createTransaction(new transaction_1.default('address1', 'romeo', 100));
// second mining:
console.log('\n Starting the miner...');
coin.minePendingTransactions('Romeo');
console.log('\n Balance of Romeo is: ' + coin.getBalanceOfAddress('romeo'));
// an array of strings
// console.table(["apples", "oranges", "bananas"]);
// console.log(JSON.stringify(coin, null, 4));
console.log(coin);
// display the blockchain in table format:
// console.table([  ['john', 'jane', 'emily'] , ["sam", "kim", "data", "frank"] , {1,2,3,4}    ], ["Timestamp", "PreviousHash", "Hash", "Nonce"]);
// console.table(coin)
function DisplayBlocks(timestamp, previousHash, hash, nonce) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = hash;
}
var john = new DisplayBlocks("John", "Smith", "a1223423", "31");
var jane = new DisplayBlocks("Jane", "Doe", "a1223423", "31");
var emily = new DisplayBlocks("Emily", "Jones", "a1223423", "31");
var displayBlocksArray = [john, jane, emily];
console.table(displayBlocksArray);
//# sourceMappingURL=index.js.map