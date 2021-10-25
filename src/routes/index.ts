import { Application } from "express";

const getBlockchain = () =>{
	return 100;
}

module.exports = (app: Application) => {
	// const User = require("../controllers/admin.controller");
	app.get("/getblockchain", getBlockchain);
};