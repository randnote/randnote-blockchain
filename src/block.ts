const SHA256 = require('crypto-js/sha256');

class Block{
	index: any;
	block:any;
	data:any;
	timestamp: any;
	transactions : any;
	previousHash: any;
	hash: any;
	nonce: any;

	constructor(timestamp: any, transactions: any, previousHash: string = ''){
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

	mineBlock(difficulty: any){
		console.log('Mining...');
		while(this.hash.substring(0, difficulty) != Array(difficulty + 1 ).join("0") ){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("BLOCK MINED: " +this.hash);
	}
	
}

export default Block;