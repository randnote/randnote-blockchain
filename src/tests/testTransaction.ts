import Axios from "axios";
import { BLOCKCHAIN_API } from "..";

/* for now , I dont just use the private and public key strings in the json sent to the server, instead; i use 
now generate the keys on the fly.. however this should not be the case... i should be able to use the strings... or atleast use
the strings but replicate the format in which the "signTransaction " file desires...
 */

import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

const createTransaction = async () => {
	let jsonn = {
		fromAddress: `0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3`,
		fromAddressPrivateKey: `f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0`,
		// toAddress: "paul",
		toAddress:
			"041394339bca8fcbc0db29eecef520c3694f518051f9a04985dd80a18fe8135d64721ee2025e055b102ec4e145b5df19dba0edd691bdc5c1cf1c46faa86039b684",
		amount: 10,
	};
	let snack = JSON.stringify(jsonn);
	// console.log)

	Axios.post(`${BLOCKCHAIN_API}/transaction`, { obj: snack }).then(
		async (response: any) => {
			console.log(response.data);
		}
	);
};

createTransaction();
