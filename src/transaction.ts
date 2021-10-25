
class Transaction {
	fromAddress: any;
	toAddress: any;
	amount: number;

	constructor(fromAddress:any, toAddress:any, amount:any){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

// module.exports = Transaction;
export default Transaction;