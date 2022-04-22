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
let tx1 = new Transaction(myWalletAddress, "paul", 100);
tx1.signTransaction(myKey);
note.addTransaction(tx1);
//
let tx12 = new Transaction(myWalletAddress, "paul", 300);
tx12.signTransaction(myKey);
note.addTransaction(tx12);
//
let tx13 = new Transaction(myWalletAddress, "paul", 400);
tx13.signTransaction(myKey);
note.addTransaction(tx13);

export { note }; // for the testblock page

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

exports.mine = (req: Request, res: Response) => {
	note.minePendingTransactionsClient(
		req.params.minerAddress,
		req.params.minerSolution,
		(err: any, data: any): any => {
			if (err)
				res.status(200).send({
					success: "false",
					message:
						err.message ||
						"The block hash you solved is not real/valid or whatever",
				});
			else res.status(200).send(data);
		}
	);

	// let minerAddress = req.params.minerAddress;

	// res.status(200).send({
	// 	reward: 100,
	// });
};

exports.createTransaction = ((req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	console.log(req.body.fromAddress);
	// let amount = req.body.amount;
	// let fromAddress = req.body.fromAddress;
	// let fromAddressPrivateKey = req.body.fromAddressPrivateKey; // havent mad this yet...
	// let toAddress = req.body.toAddress;
	// let amount = req.body.amount;

	// let newTransaction = new Transaction(fromAddress, toAddress, amount);
	// console.log("___"+newTransaction);

	// newTransaction.signTransaction(fromAddressPrivateKey);
	// // note.addTransaction(newTransaction); // instead of this, i need to add it to the signTransactionCLient
	// note.addTransactionClient(newTransaction, (err: Error, data: object) => {
	// 	if(err){
	// 		console.log("the blockchain gave us an error: ", err)
	// 	}else{
	// 		console.log(data)
	// 	}
	// });

	res.status(200).send({
		message: `Transaction from address: this, to address: this, was successful`,
	});
});

exports.getAddressBalance = (req: Request, res: Response) => {
	let address = req.params.address;
	res.status(200).send("100");
};

exports.getBlockchain = (req: Request, res: Response) => {
	res.status(200).send("yes");
};

exports.getAllTransactions = (req: Request, res: Response) => {
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
