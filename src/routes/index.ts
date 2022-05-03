import { Application } from "express";

const getBlockchain = () => {
	return 100;
};

module.exports = (app: Application) => {
	const B = require("../controllers/index");

	// gets
	app.get("/blockchain", B.getBlockchain); // brocken
	app.get("/transactions", B.getAllTransactions);
	app.get("/mine/:minerAddress/:minerSolution", B.mine);

	// posts
	app.post("/transaction", B.createTransaction);
};
