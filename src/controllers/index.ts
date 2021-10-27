import {Application, Request, Response, NextFunction } from "express";
import Blockchain from '../blockchain'
import Transaction from '../transaction'

let note  = new Blockchain();
// create a blockchain: FAKE TRANSACTIONS AND MINES------------------------------------------

note.createTransaction(new Transaction('frank', 'paul', 100 ))
note.createTransaction(new Transaction('sam', 'kim', 30 ))
note.createTransaction(new Transaction('sam', 'jim', 30 ))

console.log('\nStarting the miner...');
note.minePendingTransactions('romeo');
console.log('\nBalance of Romeo is: '+ note.getBalanceOfAddress('romeo'));

//second mining:
note.minePendingTransactions('jackie');
console.log('Balance of jackie is: '+ note.getBalanceOfAddress('jackie'));
console.log('\n');
console.log(note.getAllTransactions());
//------------------------------------------------------------------------------


exports.getBlockchain =  (req:Request, res:Response) => {
    res.send(100);
}

exports.getAllTransactions = (req:Request, res:Response) => {

    res.send(note.getAllTransactions);

    // Admin.getAll((err:any, data:any): any => {
    //   if (err)
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving Admins."
    //     });
    //   else res.send(data);
    // });
};

