"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    var B = require("../controllers/index");
    // gets
    app.get("/blockchain", B.getBlockchain); // brocken
    app.get("/transactions", B.getAllTransactions);
    app.get("/mine/:minerAddress/:minerSolution", B.mine);
    app.get("/balance/:address", B.getAddressBalance);
    app.get("/supply", B.getSupply);
    // randnote transact: This is used when user buys Notes, and the website needs to give Notes to that user.
    // posts
    app.post("/transaction", B.createTransaction);
};
//# sourceMappingURL=index.js.map