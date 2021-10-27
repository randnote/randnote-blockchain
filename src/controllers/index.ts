import {Application, Request, Response, NextFunction } from "express";
import Blockchain from '../blockchain'
import Transaction,{TransactionInterface} from '../transaction'

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

exports.mine = (req:Request, res:Response) => {
    let minerAddress = req.params.minerAddress;
    res.status(200).send({
        reward: 100
    });
}

exports.createTransaction = ((req:Request, res:Response) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
          console.log("empty")
      }

      const newTransaction: TransactionInterface = {
        fromAddress: req.body.fromAddress,
        privateKey: req.body.privatekey,
        toAddress: req.body.toAddress,
        amount: req.body.amount
      }

    
    // transaction may be accepted or refused, after validation is completed
    // make validation here:

    res.status(200).send({
        message: `Transaction from address: this, to address: this, was successful`
    });
})

exports.getAddressBalance =  (req:Request, res:Response) => {
    let address = req.params.address;
    res.status(200).send("100");
}

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

