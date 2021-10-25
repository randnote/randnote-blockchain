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
console.table(["apples", "oranges", "bananas"]);
console.log(JSON.stringify(coin, null, 4));
//# sourceMappingURL=index.js.map