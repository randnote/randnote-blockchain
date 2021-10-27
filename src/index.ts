import express, { Application, Request, Response, NextFunction } from "express";
const level = require('level')
import Blockchain from	'./blockchain'
import Transaction from './transaction'

const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];
app.use(
	cors({
		origin: function (origin: any, callback: any) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				// return callback(new Error(msg), false);
				return callback(null, true); // allow all of em
			}
			return callback(null, true);
		},
	})
);

require("./database/index")
require("./routes/index")(app);
app.listen(8033, () => console.log(`server started on port 8033`));












//--- blochain creation....------------------------------------------

let coin  = new Blockchain();
coin.createTransaction(new Transaction('frank', 'paul', 100 ))
coin.createTransaction(new Transaction('sam', 'kim', 30 ))
coin.createTransaction(new Transaction('sam', 'jim', 30 ))

console.log('\nStarting the miner...');
coin.minePendingTransactions('romeo');
console.log('\nBalance of Romeo is: '+ coin.getBalanceOfAddress('romeo'));

//second mining:
coin.minePendingTransactions('jackie');
console.log('Balance of jackie is: '+ coin.getBalanceOfAddress('jackie'));
console.log('\n');
console.log(coin.getAllTransactions());


// // create a second transaction:
// coin.createTransaction(new Transaction('address1', 'romeo', 100 ))


// // second mining:
// console.log('\n Starting the miner...');
// coin.minePendingTransactions('Romeo');
// console.log('\n Balance of Romeo is: '+ coin.getBalanceOfAddress('romeo'));

// console.log(coin)


// function DisplayBlocks(timestamp:any, previousHash:any, hash: any, nonce: any) {
//   this.timestamp = timestamp;
//   this.previousHash = previousHash;
//   this.nonce = nonce;
//   this.hash = hash;
// }

// var john = new DisplayBlocks("John", "Smith", "a1223423", "31");
// var jane = new DisplayBlocks("Jane", "Doe", "a1223423", "31");
// var emily = new DisplayBlocks("Emily", "Jones", "a1223423", "31");

// let displayBlocksArray = [john, jane, emily];

// console.table(displayBlocksArray);

//---------------------------------------------
