import { Application } from "express";

module.exports = (app: Application) => {
	const B = require("../controllers/index");

	// gets
	app.get("/blockchain", B.getBlockchain); // brocken
	app.get("/transactions", B.getAllTransactions);
	app.get("/mine/:minerAddress/:minerSolution", B.mine);
	app.get("/balance/:address", B.getAddressBalance);
	app.get("/supply", B.getSupply);

	// posts
	app.post("/transaction", B.createTransaction);
};
