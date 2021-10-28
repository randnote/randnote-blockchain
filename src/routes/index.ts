import { Application } from "express";

const getBlockchain = () => {
	return 100;
};

module.exports = (app: Application) => {
	const Blockchain = require("../controllers/index");

	//gets
	app.get("/blockchain", getBlockchain);
	app.get("/transactions", Blockchain.getAllTransactions);

	/*How this will work, is that:
	1. the miner sends a request to mine a block, 
	*/
	app.get("/mine/:minerAddress", Blockchain.mine);

	//posts
};
