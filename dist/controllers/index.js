"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blockchain_1 = __importDefault(require("../blockchain"));
var transaction_1 = __importDefault(require("../transaction"));
// imports for testing purposes:
var elliptic_1 = __importDefault(require("elliptic"));
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
// sampling giving keys to the server and adding a transaction:
var note = new blockchain_1.default();
var myKey = ec.keyFromPrivate("f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0"); // passing in the private key
var myWalletAddress = myKey.getPublic("hex"); // mywalletaddress is my public key
// create sample transaction and sign it:
var tx1 = new transaction_1.default(myWalletAddress, "paul", 100);
tx1.signTransaction(myKey);
note.addTransaction(tx1);
//
var tx12 = new transaction_1.default(myWalletAddress, "paul", 300);
tx12.signTransaction(myKey);
note.addTransaction(tx12);
//
var tx13 = new transaction_1.default(myWalletAddress, "paul", 400);
tx13.signTransaction(myKey);
// note.addTransaction(tx13);
//
// console.log("\nStarting the miner...");
// note.minePendingTransactions("paul");
// console.log("\nBalance of paul is: " + note.getBalanceOfAddress("paul"));
//second mining:
// note.minePendingTransactions("jackie");
// console.log("Balance of paul is: " + note.getBalanceOfAddress("paul"));
// console.log("\n");
// console.log(note.getAllTransactions());
//------------------------------------------------------------------------------
exports.mine = function (req, res) {
    note.minePendingTransactionsClient(req.params.minerAddress, req.params.minerSolution, function (err, data) {
        if (err)
            res.status(200).send({
                success: "false",
                message: err.message ||
                    "The block hash you solved is not real/valid or whatever",
            });
        else
            res.status(200).send(data);
    });
    // let minerAddress = req.params.minerAddress;
    // res.status(200).send({
    // 	reward: 100,
    // });
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