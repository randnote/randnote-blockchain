"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    var Blockchain = require("../controllers/index");
    app.get("/blockchain", getBlockchain);
    app.get("/transactions", Blockchain.getAllTransactions);
    /*How this will work, is that:
    1. the miner sends a request to mine a block,
    */
    app.get("/mine/:minerAddress", Blockchain.mine);
};
//# sourceMappingURL=index.js.map