import Transaction from "./transaction";
import Block from "./block";
import getTimeFormatted from "./time";

class Blockchain {
	chain: any;
	difficulty: any;
	pendingTransactions: any;
	miningReward: any;

	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block(getTimeFormatted(), [], "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(minerAddress: string) {
		/* make this function delay, till there are atleast 5 transactions,
		if still less, then dont send anything...*/

		let block = new Block(
			getTimeFormatted(),
			this.pendingTransactions,
			this.getLatestBlock().hash
		); // currently we are just mining all the transactions that are pending
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined!");
		this.chain.push(block);

		// create a new transaction(a reward for the solver of the previous block)
		this.pendingTransactions = [
			new Transaction(null, minerAddress, this.miningReward),
		];
	}

	// method to send the block back to the user to start mining:
	async minePendingTransactionsClient(
		minerAddress: string,
		minerSolution: any,
		result: any
	) {
		/* if the client queries with an empty string or null for the minerSolution, then they just want the block to mine,
		however if they send both minerAddress and the minerSolution, then they think they have a solution... */
		let block = new Block(
			getTimeFormatted(),
			this.pendingTransactions,
			this.getLatestBlock().hash
		);
		if (!minerSolution.length || minerSolution == 0) {
			// only give them the block information

			result(null, { block: block, difficulty: this.difficulty }); // send the blockchain data back to the user, along with the difficulty...
		} else {
			let mymine = await block.mineBlock(this.difficulty);
			let yourmine = minerSolution;
			console.log("minersolution: ", yourmine);
			console.log("server solution: ", mymine);

			if (mymine == yourmine) {
				// success
				this.chain.push(block);
				console.log("Block successfully mined!");
				this.chain.push(block);

				this.pendingTransactions = [
					new Transaction(null, minerAddress, this.miningReward),
				];
				result(null, {
					message: "success",
					reward: this.miningReward,
				});
			} else {
				result({ message: "wrong solution" }, null); // added error mesasge
			}
		}
	}

	addTransaction(transaction: any): void {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error("Transaction must include from and to address");
		}

		if (!transaction.isValid()) {
			throw new Error("Cannot add invalid tranasaction to chain");
		}

		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address: string): number {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (address === trans.fromAddress) {
					balance -= trans.amount;
				}
				if (address === trans.toAddress) {
					balance += trans.amount;
				}
			}
		}
		return balance;
	}

	isChainValid(): boolean {
		// traverse the entire blockchain and verify that the blocks are linked properly
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}

			// confirms the hash of every block using its own data
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}

	// function that gets all the transactions in all the blocks by iteration:
	getAllTransactions() {
		let count = 0;
		let transactionsArray: any = [];
		let transactionsArrayFormatted: string[] = [];
		for (let i = 0; i < this.chain.length; i++) {
			transactionsArray.push(this.chain[i].transactions);
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
