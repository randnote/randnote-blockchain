"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var time_1 = __importDefault(require("./time"));
var Transaction = /** @class */ (function () {
    function Transaction(fromAddress, toAddress, amount) {
        this.timestamp = time_1.default();
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    return Transaction;
}());
// module.exports = Transaction;
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map