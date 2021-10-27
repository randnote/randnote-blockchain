import getTimeFormatted from "./time";

export interface TransactionInterface{
	timestamp?: string;
	fromAddress: string;
	privateKey?: string;
	toAddress: string;
	amount: number;
}

class Transaction {
	timestamp: any;
	fromAddress: any;
	toAddress: any;
	amount: number;

	constructor(fromAddress:any, toAddress:any, amount:any){
		this.timestamp = getTimeFormatted();
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

// module.exports = Transaction;
export default Transaction;