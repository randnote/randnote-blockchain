import Transaction from './transaction'
import Block from './block'
import getTimeFormatted from './time';

class Blockchain{
	chain: any;
	difficulty: any;
	pendingTransactions: any;
	miningReward: any;

	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock(){
		return new Block(getTimeFormatted(), [], "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	minePendingTransactions(miningRewardAddress:any){
		let block = new Block(getTimeFormatted(), this.pendingTransactions, this.getLatestBlock().hash) // currently we are just mining all the transactions that are pending
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined!");
		this.chain.push(block);

		// create a new transaction(a reward for the solver of the previous block)
		this.pendingTransactions = [
			new Transaction(null, miningRewardAddress, this.miningReward)
		]
	}

	createTransaction(transaction:any){
		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address:any){
		let balance = 0;

		for( const block of this.chain){
			for(const trans of block.transactions){
				if(address === trans.fromAddress){
					balance-= trans.amount;
				}
				if(address === trans.toAddress){
					balance+= trans.amount;
				}
			}
		}
		return balance;
	}

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

	// function that gets all the transactions in all the blocks by iteration:
	getAllTransactions(){
		let count = 0;
		let transactionsArray:any = [];
		let transactionsArrayFormatted: string[] = [];
		for (let i = 0; i < this.chain.length; i++) {
			transactionsArray.push( this.chain[i].transactions);
			// for (let j = 0; j < transactionsArray.length; j++) {
			// 	const {fromAddress, toAddress, amount} = transactionsArray[j]
			// 	transactionsArrayFormatted.push(`${count}. fromAddress: ${fromAddress}, \t toAddress: ${toAddress},\t amount : ${amount}`)
			// 	count++;

			// }
			
		}
		return transactionsArray;
	}
}

export default Blockchain;