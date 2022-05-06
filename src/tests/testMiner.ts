import Axios from "axios";
const SHA256 = require("crypto-js/sha256");
import { response } from "express";
import Block from "../block";
import { note } from "../controllers";

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
		`http://localhost:8033/mine/john_miner/0`
	).then(async (response: any) => {
		// console.log(response.data);
		let block = await response.data.block;

		// prepare the difficulty and everything:
		let difficulty: any = 2;
		console.log(block);
		console.log("---");

		let hash = await calculateHash(
			block.timestamp,
			block.previousHash,
			block.transactions,
			block.nonce
		);
		console.log("Mining...");
		while (
			hash.substring(0, difficulty) != Array(difficulty + 1).join("0")
		) {
			block["nonce"]++;
			hash = calculateHash(
				block.timestamp,
				block.previousHash,
				block.transactions,
				block.nonce
			);
		}
		console.log("BLOCK MINED: " + block["hash"]); // just displays the hash string

		// now send to the server:
		Axios.get(
			`http://localhost:8033/mine/john_miner/${hash}`
		).then((response: any) => {
			console.log(response.data);
		});
	});
};

// console.log("hello");
mineBlock();

// test by looking at the new blockchain
// console.log(note.chain);
