const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(timestamp, transactions, previousHash = ''){
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	// calc the hash func of the block... creates the hash for our block
	calculateHash(){
		return SHA256(this.index + 
			this.previousHash +  
			this.timestamp + 
			JSON.stringify(this.data) + 
			this.nonce ).toString();
	}

	mineBlock(difficulty){
		console.log('Mining...');
		while(this.hash.substring(0, difficulty) != Array(difficulty + 1 ).join("0") ){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("BLOCK MINED: " +this.hash);
	}
	
}

module.exports = Block;