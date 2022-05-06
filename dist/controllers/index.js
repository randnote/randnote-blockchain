"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.note = void 0;
var blockchain_1 = __importDefault(require("../blockchain"));
var transaction_1 = __importDefault(require("../transaction"));
// imports for testing purposes:
var elliptic_1 = __importDefault(require("elliptic"));
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
// sampling giving keys to the server and adding a transaction:
var note = new blockchain_1.default();
exports.note = note;
var myKey = ec.keyFromPrivate("f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0"); // passing in the private key
var myWalletAddress = myKey.getPublic("hex"); // mywalletaddress is my public key
//------------------------------------------------------------------------------
exports.mine = function (req, res) {
    note.minePendingTransactionsClient(req.params.minerAddress, req.params.minerSolution, function (err, data) {
        if (err)
            res.status(204).send({
                success: "false",
                message: err.message ||
                    "The block hash you solved is not real/valid or whatever",
            });
        else
            res.status(200).send(data);
    });
};
exports.createTransaction = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    /* THIS IS A METHOD I TRIED THAT SENDS JUST THE STRING */
    var myJsonInfo = JSON.parse(req.body.obj);
    //console.log(myJsonInfo.fromAddressPrivateKey); // with all that i have done so far, I have ended up with this
    //
    var newTransaction = new transaction_1.default(myJsonInfo.fromAddress, myJsonInfo.toAddress, myJsonInfo.amount);
    newTransaction.signTransactionClient(myJsonInfo.fromAddress, myJsonInfo.fromAddressPrivateKey); // apparently the code never reaches this line....??>>?
    note.addTransactionClient(newTransaction, function (err) {
        if (err) {
            console.log(err);
        }
    });
    // console.log("A transaction has been created")
    console.log("Here is the pending transactions: ".concat(note.getPendingTransactions()));
    res.status(200).send({
        message: "Transaction from address: this, to address: this, was successful",
    });
};
exports.getAddressBalance = function (req, res) {
    var address = req.params.address;
    var balance = note.getBalanceOfAddress(address);
    res.status(200).send({
        msg: "The balance of the address: ".concat(address, " is : ").concat(balance),
        balance: balance,
    });
};
exports.getBlockchain = function (req, res) {
    note.getBlockchain(function (err, result) {
        if (err) {
            res.status(500).send({
                message: "Error occured",
            });
        }
        else
            res.send(result);
    });
};
exports.getAllTransactions = function (req, res) {
    // console.log(note.getAllTransactions());
    res.status(200).send(note.getAllTransactions());
};
//# sourceMappingURL=index.js.map