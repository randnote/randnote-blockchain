"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
// axios to get the blockchain
axios_1.default.get("http://localhost:8033/mine/0465f31d0233efa00f829098040de97d254922bc6730a2f59bee6525e203a5c3f10168be5391b28eb9fa81a0aa87583040c2e9542b7aad50666577b446239d6fc3/0")
    .then(function (response) {
    console.log(response.data.block);
});
function mineBlock(difficulty) {
    // prepare the difficulty and everything:
    console.log("Mining...");
    while (this.hash.substring(0, difficulty) !=
        Array(difficulty + 1).join("0")) {
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
//# sourceMappingURL=test.js.map