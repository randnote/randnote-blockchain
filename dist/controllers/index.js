"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blockchain_1 = __importDefault(require("../blockchain"));
var transaction_1 = __importDefault(require("../transaction"));
var note = new blockchain_1.default();
// create a blockchain: FAKE TRANSACTIONS AND MINES------------------------------------------
note.createTransaction(new transaction_1.default('frank', 'paul', 100));
note.createTransaction(new transaction_1.default('sam', 'kim', 30));
note.createTransaction(new transaction_1.default('sam', 'jim', 30));
console.log('\nStarting the miner...');
note.minePendingTransactions('romeo');
console.log('\nBalance of Romeo is: ' + note.getBalanceOfAddress('romeo'));
//second mining:
note.minePendingTransactions('jackie');
console.log('Balance of jackie is: ' + note.getBalanceOfAddress('jackie'));
console.log('\n');
console.log(note.getAllTransactions());
//------------------------------------------------------------------------------
exports.getBlockchain = function (req, res) {
    res.status(200).send("yes");
};
exports.getAllTransactions = function (req, res) {
    console.log(note.getAllTransactions());
    res.status(200).send(note.getAllTransactions());
    // res.status(200).send("yes");
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving Admins."
    //     });
    //   else res.send(data);
    // });
};
//# sourceMappingURL=index.js.map