"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SHA256 = require("crypto-js/sha256");
var time_1 = __importDefault(require("./time"));
var elliptic_1 = __importDefault(require("elliptic"));
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
var Transaction = /** @class */ (function () {
    function Transaction(fromAddress, toAddress, amount) {
        this.timestamp = (0, time_1.default)();
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    // calculate the hash of the transaction:
    Transaction.prototype.calculateHash = function () {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    };
    /* before we let the transaction get added to a block:
     we need to sign it with the keys first */
    Transaction.prototype.signTransaction = function (signingKey) {
        // check this type in future
        // singing key is the private key we sing with
        // fist verify is the public key is the fromAddress, to only allow signing transactions that you own:
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            // remove this error and create an error that we send to the API
            throw new Error("You can only sign transactions that you own");
        }
        var hashTx = this.calculateHash();
        var sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    };
    // verify a transaction func:
    // since a transaction is supposed to be signed, we check if indeed it is and verfiy the signature: using the verify() func
    Transaction.prototype.isValid = function () {
        if (this.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }
        var publicKey = ec.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    };
    return Transaction;
}());
// module.exports = Transaction;
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map