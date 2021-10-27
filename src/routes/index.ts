import { Application } from "express";

const getBlockchain = () =>{
	return 100;
}

module.exports = (app: Application) => {
	const Blockchain = require("../controllers/index");
	app.get("/blockchain", getBlockchain);
	app.get("/transactions", Blockchain.getAllTransactions)
};
