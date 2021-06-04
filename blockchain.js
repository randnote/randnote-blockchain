const SHA256 = require('crypto-js/sha256');
const Transactions = require('./transaction')
const Block = require("./block");

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
	}

	createGenesisBlock(){
		return new Block("2021/01/01", [], "0")
	}

	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);	
	}

	// function to verify the blocks in the blochain
	isChainValid(){
		// traverse the entire blockchain and verify that the blocks are linked properly
		for(let i = 1 ; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			// confirms the hash of every block using its own data
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		return true;
	}
}




let coin  = new Blockchain();
coin.addBlock(new Block(Date.now(), [], {amount: 4}));
// coin.addBlock(new Block(2, "2021/02/15", {amount: 4}));
// coin.addBlock(new Block(3, "2021/03/10", {amount: 10000000}))
// console.log(coin.)

console.log(JSON.stringify(coin, null, 4));
