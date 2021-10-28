"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    var Blockchain = require("../controllers/index");
    //gets
    app.get("/blockchain", getBlockchain); // brocken
    app.get("/transactions", Blockchain.getAllTransactions);
    /*How this will work, is that:
    1. the miner sends a request to mine a block,
    */
    app.get("/mine/:minerAddress/:minerSolution", Blockchain.mine);
    //posts
};
//# sourceMappingURL=index.js.map