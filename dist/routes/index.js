"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    var Blockchain = require("../controllers/index");
    // gets
    app.get("/blockchain", getBlockchain); // brocken
    app.get("/transactions", Blockchain.getAllTransactions);
    app.get("/mine/:minerAddress/:minerSolution", Blockchain.mine);
    // posts
    app.post("/transaction", Blockchain.createTransaction);
};
//# sourceMappingURL=index.js.map