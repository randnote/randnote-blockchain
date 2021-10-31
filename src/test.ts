import Axios from "axios";
import { response } from "express";
import Block from "./block";

// axios to get the blockchain
const getBlock = () =>{
    Axios.get(`http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0`)
        .then( (response: any)=>{
            console.log(response.data);
            let block = response.data
            return response.data;
        }
)}


function mineBlock(difficulty: number) {
    // prepare the difficulty and everything:

    console.log("Mining...");
    while (
        this.hash.substring(0, difficulty) !=
        Array(difficulty + 1).join("0")
    ) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash); // just displays the hash string
}

// axios to mine and then send the solution:
// const mineBlockchain = () = async =>{

    


//     await Axios.get(`http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0`)
//         .then( (response: any)=>{
//             console.log(response.data);

//             // mine the block
//         }
//     )
// }

console.log("hello");