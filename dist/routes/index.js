"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    var B = require("../controllers/index");
    // gets
    app.get("/blockchain", B.getBlockchain); // brocken
    app.get("/transactions", B.getAllTransactions);
    app.get("/mine/:minerAddress/:minerSolution", B.mine);
    app.get("/balance/:address", B.getAddressBalance);
    // posts
    app.post("/transaction", B.createTransaction);
};
//# sourceMappingURL=index.js.map