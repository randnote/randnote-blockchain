const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, 
		timestamp, 
		data, 
		previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
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
		while(this.hash.substring(0, difficulty) != Array(difficulty + 1 ).join("0") ){
			console.log('trying hash: '+this.hash)
			// console.clear();
			this.nonce++;
			this.hash = this.calculateHash();
		}
		
		console.log("Block mined: "+this.hash);
	}
	
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}

	createGenesisBlock(){
		return new Block(0, "2021/01/01", "GenesisBlock", "0")
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
coin.addBlock(new Block(1, "2021/01/22", {amount: 4}));
coin.addBlock(new Block(2, "2021/02/15", {amount: 4}));
coin.addBlock(new Block(3, "2021/03/10", {amount: 10000000}))
// console.log(coin.)

console.log(coin.isChainValid());
console.log(JSON.stringify(coin, null, 4));

// let diff = 2
// console.log(Array(diff + 1 ).join("0"));
// console.log([0,0,0,0].split('').join())