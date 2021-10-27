"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    var Blockchain = require("../controllers/index");
    app.get("/blockchain", getBlockchain);
    app.get("/transactions", Blockchain.getAllTransactions);
};
//# sourceMappingURL=index.js.map