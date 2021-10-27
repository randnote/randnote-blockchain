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
    res.status(200).send("yes");
}

exports.getAllTransactions = (req:Request, res:Response) => {
    console.log(note.getAllTransactions())
    res.status(200).send(note.getAllTransactions());
    // res.status(200).send("yes");
    
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving Admins."
    //     });
    //   else res.send(data);
    // });
};

