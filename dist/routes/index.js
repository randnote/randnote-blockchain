"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    var B = require("../controllers/index");
    // gets
    app.get("/blockchain", getBlockchain); // brocken
    app.get("/transactions", B.getAllTransactions);
    app.get("/mine/:minerAddress/:minerSolution", B.mine);
    // posts
    app.post("/transaction", B.createTransaction);
};
//# sourceMappingURL=index.js.map