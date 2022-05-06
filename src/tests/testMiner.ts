import Axios from "axios";
const SHA256 = require("crypto-js/sha256");
import { response } from "express";
import { exit } from "process";
import Block from "../block";
import { note } from "../controllers";

// get argument for the name of the uer
let minerName = process.argv.slice(2)[0];

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
	Axios.get(`http://localhost:8033/mine/${minerName}/0`).then(
		async (response: any) => {
			// console.log(response.data);

			/* I need to check the status code we get back before i continue to proceed.. 
			we are checking if we even have transactions to mine or not */
			console.log(response.status);
			if (response.status === 204) {
				console.log(
					"There arent transactions to mine! Give it time & try again next time!"
				);
				process.exit(1);
			}

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
			Axios.get(`http://localhost:8033/mine/${minerName}/${hash}`).then(
				(response: any) => {
					console.log(response.data);
				}
			);
		}
	);
};

// console.log("hello");
mineBlock();

// test by looking at the new blockchain
// console.log(note.chain);
