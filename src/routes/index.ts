import { Application } from "express";

const getBlockchain = () => {
	return 100;
};

module.exports = (app: Application) => {
	const Blockchain = require("../controllers/index");

	//gets
	app.get("/blockchain", getBlockchain); // brocken
	app.get("/transactions", Blockchain.getAllTransactions);
	app.get("/mine/:minerAddress/:minerSolution", Blockchain.mine);

	//posts
};
