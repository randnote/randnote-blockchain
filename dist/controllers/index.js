"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blockchain_1 = __importDefault(require("../blockchain"));
var transaction_1 = __importDefault(require("../transaction"));
var note = new blockchain_1.default();
// create a blockchain: FAKE TRANSACTIONS AND MINES------------------------------------------
note.createTransaction(new transaction_1.default("frank", "paul", 100));
note.createTransaction(new transaction_1.default("sam", "kim", 30));
note.createTransaction(new transaction_1.default("sam", "jim", 30));
console.log("\nStarting the miner...");
note.minePendingTransactions("romeo");
console.log("\nBalance of Romeo is: " + note.getBalanceOfAddress("romeo"));
//second mining:
note.minePendingTransactions("jackie");
console.log("Balance of jackie is: " + note.getBalanceOfAddress("jackie"));
console.log("\n");
console.log(note.getAllTransactions());
//------------------------------------------------------------------------------
exports.mine = function (req, res) {
    var minerAddress = req.params.minerAddress;
    res.status(200).send({
        reward: 100,
    });
};
exports.createTransaction = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var newTransaction = {
        fromAddress: req.body.fromAddress,
        privateKey: req.body.privatekey,
        toAddress: req.body.toAddress,
        amount: req.body.amount,
    };
    // transaction may be accepted or refused, after validation is completed
    // make validation here:
    res.status(200).send({
        message: "Transaction from address: this, to address: this, was successful",
    });
};
exports.getAddressBalance = function (req, res) {
    var address = req.params.address;
    res.status(200).send("100");
};
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