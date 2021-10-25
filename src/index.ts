import Blockchain from	'./blockchain'
import Transaction from './transaction'


let coin  = new Blockchain();

coin.createTransaction(new Transaction('address1', 'romeo', 100 ))
// coin.createTransaction(new Transaction('romeo', 'address3', 30 ))



console.log('\n Starting the miner...');
coin.minePendingTransactions('Romeo');
console.log('\n Balance of Romeo is: '+ coin.getBalanceOfAddress('romeo'));

// create a second transaction:
coin.createTransaction(new Transaction('address1', 'romeo', 100 ))


// second mining:
console.log('\n Starting the miner...');
coin.minePendingTransactions('Romeo');
console.log('\n Balance of Romeo is: '+ coin.getBalanceOfAddress('romeo'));


// an array of strings

console.table(["apples", "oranges", "bananas"]);

console.log(JSON.stringify(coin, null, 4));
