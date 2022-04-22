const SHA256 = require("crypto-js/sha256");
import getTimeFormatted from "./time";
import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

export interface TransactionInterface {
	timestamp?: string;
	fromAddress: string;
	privateKey?: string;
	toAddress: string;
	amount: number;
}

class Transaction {
	timestamp: any;
	fromAddress: any;
	toAddress: any;
	amount: number;
	signature: string;

	constructor(fromAddress: any, toAddress: any, amount: any) {
		this.timestamp = getTimeFormatted();
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}

	// calculate the hash of the transaction:
	calculateHash() {
		return SHA256(
			this.fromAddress + this.toAddress + this.amount
		).toString();
	}

	/* before we let the transaction get added to a block:
	 we need to sign it with the keys first */
	signTransaction(signingKey: any) {
		// check this type in future
		// singing key is the private key we sing with
		console.log(signingKey) // lets do this, to validate that we indeed use the right key or not

		// fist verify is the public key is the fromAddress, to only allow signing transactions that you own:
		if (signingKey.getPublic("hex") !== this.fromAddress) {
			// remove this error and create an error that we send to the API
			throw new Error("You can only sign transactions that you own");
		}

		const hashTx = this.calculateHash();
		const sig = signingKey.sign(hashTx, "base64");
		this.signature = sig.toDER("hex");
	}

	// verify a transaction func:
	// since a transaction is supposed to be signed, we check if indeed it is and verfiy the signature: using the verify() func
	isValid() {
		if (this.fromAddress === null) return true;
		if (!this.signature || this.signature.length === 0) {
			throw new Error("No signature in this transaction");
		}

		const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

// module.exports = Transaction;
export default Transaction;
