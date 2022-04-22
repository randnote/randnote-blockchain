import Axios from "axios";
const SHA256 = require("crypto-js/sha256");
import { response } from "express";
import Block from "./block";
import { note } from "./controllers";


const createTransaction = async () => {
	// first get the block:
    const theJsonData = { 
        "fromAddress": "f224f9e944b73c51ee9a8140b65e8f06e1422a3fecc4c79fc8577bc80a427ce0",
        "fromAddressPrivateKey": "0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3",
        "toAddress": "12",
        "amount": 10
    };
	Axios.post(
		`http://localhost:8033/transaction`, theJsonData
	).then(async (response: any) => {
		//
        console.log(response.data);
	})
};

createTransaction();

// test by looking at the new blockchain
// console.log(note.chain);
