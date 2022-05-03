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
// create sample transaction and sign it:
var tx1 = new transaction_1.default(myWalletAddress, "paul", 100);
tx1.signTransaction(myKey);
note.addTransaction(tx1);
// console.log("mykey is: "+ JSON.stringify(myKey, null, 2))
console.log(myKey);
//
console.log("\nStarting the miner...");
note.minePendingTransactions("paul");
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
    /* THIS IS A METHOD I TRIED THAT SENDS JUST THE STRING */
    console.log(JSON.parse(req.body.obj));
    var myJsonInfo = JSON.parse(req.body.obj);
    console.log(myJsonInfo.fromAddressPrivateKey); // with all that i have done so far, I have ended up with this
    //
    var newTransaction = new transaction_1.default(myJsonInfo.fromAddress, myJsonInfo.toAddress, myJsonInfo.amount);
    newTransaction.signTransactionClient(myJsonInfo.fromAddress, myJsonInfo.fromAddressPrivateKey); // apparently the code never reaches this line....??>>?
    // let amount = req.body.amount;
    // let fromAddress = req.body.fromAddress;
    // let fromAddressPrivateKey = req.body.fromAddressPrivateKey; // havent mad this yet...
    // let toAddress = req.body.toAddress;
    // let newTransaction = new Transaction(fromAddress, toAddress, amount);
    // console.log("___" + JSON.stringify(newTransaction));
    // console.log(req.body.fromAddressPrivateKey)
    // newTransaction.signTransaction(req.body.fromAddressPrivateKey); // apparently the code never reaches this line....??>>?
    // // note.addTransaction(newTransaction); // instead of this, i need to add it to the signTransactionCLient
    // note.addTransactionClient(newTransaction, (err: Error, data: object) => {
    // 	if (err) {
    // 		console.log("the blockchain gave us an error: ", err);
    // 	} else {
    // 		console.log(data);
    // 	}
    // });
    res.status(200).send({
        message: "Transaction from address: this, to address: this, was successful",
    });
};
exports.getAddressBalance = function (req, res) {
    var address = req.params.address;
    res.status(200).send("100");
};
exports.getBlockchain = function (req, res) {
    // res.status(200).send("yes");
    // console.log("hello kitty");
    // res.status(200).send({
    // 	message: `hello`,
    // });
    // note.getBlockchain = (err: any, result: any) => {
    // 	if(err){
    // 		res.status(500).send({
    // 			message: "Error occured"
    // 		})
    // 	}else{
    // 		console.log(result)
    // 		res.status(200).send({
    // 			result: result
    // 		});
    // 	}
    // }
    note.getBlockchain(function (err, result) {
        if (err) {
            res.status(500).send({
                message: "Error occured"
            });
        }
        else
            res.send(result);
    });
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