import Axios from "axios";

/* for now , I dont just use the private and public key strings in the json sent to the server, instead; i use 
now generate the keys on the fly.. however this should not be the case... i should be able to use the strings... or atleast use
the strings but replicate the format in which the "signTransaction " file desires...
 */

import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

let theJsonData = {};

const func = () => {
	const myKey = ec.keyFromPrivate(
		"f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0"
	); // passing in the private key
	const myWalletAddress = myKey.getPublic("hex"); // mywalletaddress is my public key

	theJsonData = {
		fromAddress: myWalletAddress,
		fromAddressPrivateKey: myKey,
		toAddress: "jim",
		amount: 10,
	};
	console.log("the from address is: __ " + JSON.stringify(theJsonData));
	// createTransaction();
};

const createTransaction = async () => {
	// first get the block:
	// const theJsonData = {
	// 	fromAddress:
	// 		"f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0",
	// 	fromAddressPrivateKey:
	// 		"0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3",
	// 	toAddress: "romeo",
	// 	amount: 10,
	// };

	// const myKey = ec.keyFromPrivate(
	// 	"f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0"
	// ); // passing in the private key
	// const myWalletAddress = myKey.getPublic("hex"); // mywalletaddress is my public key

	// console.log(myWalletAddress);
	// console.log(myKey);

	let jsonn = {
		fromAddress: "0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3",
		fromAddressPrivateKey: "f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0",
		toAddress: "romeo",
		amount: 10,
	};
	let snack = JSON.stringify(jsonn);
	// console.log)

	Axios.post(`http://localhost:8033/transaction`, { obj: snack }).then(
		async (response: any) => {
			//
			console.log(response.data);
		}
	);
};

createTransaction();
