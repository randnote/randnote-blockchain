import Axios from "axios";
const SHA256 = require("crypto-js/sha256");
import { response } from "express";
import Block from "./block";
import { note } from "./controllers";

// axios to get the blockchain
// const getBlock = () => {
// 	Axios.get(
// 		`http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0`
// 	).then( async(response: any) => {
// 		// console.log(response.data);
// 		let block = await response.data.block;
// 		return block;
// 	});
// };

const calculateHash = (
	timestamp: any,
	previousHash: any,
	transactions: any,
	nonce: any
) => {
	return SHA256(
		timestamp + previousHash + JSON.stringify(transactions) + nonce
	).toString();
};

const mineBlock = async () => {
	// first get the block:
	Axios.get(
		`http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0`
	).then( async(response: any) => {
		// console.log(response.data);
		let block = await response.data.block;

		// prepare the difficulty and everything:
		let difficulty: any = 2;
		console.log(block);
		console.log("---");

		let hash = await calculateHash(block.timestamp, block.previousHash, block.transactions, block.nonce);
		console.log("Mining...");
		while (
			hash.substring(0, difficulty) != Array(difficulty + 1).join("0")
		) {
			block['nonce']++;
			hash = calculateHash(block.timestamp, block.previousHash, block.transactions, block.nonce);;
		}
		console.log("BLOCK MINED: " + block['hash']); // just displays the hash string
		
	});
};

// send the solution:
// const mineBlockchain = () = async =>{
//     await Axios.get(`http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0`)
//         .then( (response: any)=>{
//             console.log(response.data);

//             // mine the block
//         }
//     )
// }

// console.log("hello");
mineBlock();

// test by looking at the new blockchain
console.log(note.chain);
