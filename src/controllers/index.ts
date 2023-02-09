import { Application, Request, Response, NextFunction } from "express";
import Blockchain from "../blockchain";
import Transaction, { TransactionInterface } from "../transaction";

// imports for testing purposes:
import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

// sampling giving keys to the server and adding a transaction:
const note = new Blockchain();
const myKey = ec.keyFromPrivate(
	"f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0"
); // passing in the private key
const myWalletAddress = myKey.getPublic("hex"); // mywalletaddress is my public key

// create sample transaction and sign it:
// let tx1 = new Transaction(myWalletAddress, "paul", 100);
// tx1.signTransaction(myKey);
// note.addTransaction(tx1);

// sample miner
// console.log("\nStarting the miner...");
// note.minePendingTransactions("john_miner");

export { note }; // for the testblock page

//------------------------------------------------------------------------------

exports.mine = (req: Request, res: Response) => {
	note.minePendingTransactionsClient(
		req.params.minerAddress,
		req.params.minerSolution,
		(err: any, data: any): any => {
			if (err)
				res.status(204).send({
					// 204 for success but with no 'real affect to the block chain'
					success: "false",
					message:
						err.message ||
						"The block hash you solved is not real/valid or whatever",
				});
			else res.status(200).send(data);
		}
	);
};

exports.createTransaction = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	/* THIS IS A METHOD I TRIED THAT SENDS JUST THE STRING */

	let myJsonInfo = JSON.parse(req.body.obj);
	console.log(req.body.obj)
	//console.log(myJsonInfo.fromAddressPrivateKey); // with all that i have done so far, I have ended up with this
	//
	let newTransaction = new Transaction(
		myJsonInfo.fromAddress,
		myJsonInfo.toAddress,
		myJsonInfo.amount
	);
	newTransaction.signTransactionClient(
		myJsonInfo.fromAddress,
		myJsonInfo.fromAddressPrivateKey
	); // apparently the code never reaches this line....??>>?

	note.addTransactionClient(newTransaction, (err: any) => {
		if (err) {
			console.log(err);
		}
	});

	// console.log("A transaction has been created")
	console.log(
		`Here is the pending transactions: ${note.getPendingTransactions()}`
	);

	res.status(200).send({
		message: `Transaction from address: this, to address: this, was successful`,
	});
}; // END OF CREATE TRANSACTION

exports.getAddressBalance = (req: Request, res: Response) => {
	let address = req.params.address;

	let balance: number = note.getBalanceOfAddress(address);
	res.status(200).send({
		msg: `The balance of the address: ${address} is : ${balance}`,
		balance: balance,
	});
};

exports.getBlockchain = (req: Request, res: Response) => {
	note.getBlockchain((err: any, result: any) => {
		if (err) {
			res.status(500).send({
				message: "Error occured",
			});
		} else res.send(result);
	});
};

exports.getAllTransactions = (req: Request, res: Response) => {
	// console.log(note.getAllTransactions());
	res.status(200).send(note.getAllTransactions());
};

exports.getSupply = (req: Request, res: Response) => {
	res.status(200).send({
		supply: note.getSupply(),
	});
};
