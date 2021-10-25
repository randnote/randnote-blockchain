"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBlockchain = function () {
    return 100;
};
module.exports = function (app) {
    // const User = require("../controllers/admin.controller");
    app.get("/getblockchain", getBlockchain);
};
//# sourceMappingURL=index.js.map