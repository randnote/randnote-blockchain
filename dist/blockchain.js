"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = __importDefault(require("./transaction"));
var block_1 = __importDefault(require("./block"));
var time_1 = __importDefault(require("./time"));
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    Blockchain.prototype.createGenesisBlock = function () {
        return new block_1.default((0, time_1.default)(), [], "0");
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.minePendingTransactions = function (minerAddress) {
        /* make this function delay, till there are atleast 5 transactions,
        if still less, then dont send anything...*/
        var block = new block_1.default((0, time_1.default)(), this.pendingTransactions, this.getLatestBlock().hash); // currently we are just mining all the transactions that are pending
        block.mineBlock(this.difficulty);
        console.log("Block successfully mined!");
        this.chain.push(block);
        // create a new transaction(a reward for the solver of the previous block)
        this.pendingTransactions = [
            new transaction_1.default(null, minerAddress, this.miningReward),
        ];
    };
    // method to send the block back to the user to start mining:
    Blockchain.prototype.minePendingTransactionsClient = function (minerAddress, minerSolution, result) {
        return __awaiter(this, void 0, void 0, function () {
            var block, mymine, yourmine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pendingTransactions.length === 0) {
                            console.log("Tried mining with no transactions in the pendingTransactions Array.");
                            result({
                                message: "0 Pending transactions to be mined, try again next time",
                                success: false,
                            }, null);
                            return [2 /*return*/];
                        }
                        block = new block_1.default((0, time_1.default)(), this.pendingTransactions, this.getLatestBlock().hash);
                        if (!(!minerSolution.length || minerSolution == 0)) return [3 /*break*/, 1];
                        // only give them the block information
                        result(null, { block: block, difficulty: this.difficulty }); // send the blockchain data back to the user, along with the difficulty...
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, block.mineBlock(this.difficulty)];
                    case 2:
                        mymine = _a.sent();
                        yourmine = minerSolution;
                        console.log("minersolution: ", yourmine);
                        console.log("server solution: ", mymine);
                        if (mymine == yourmine) {
                            // success
                            this.chain.push(block);
                            // console.log("Block successfully mined!");
                            this.pendingTransactions = [
                                new transaction_1.default(null, minerAddress, this.miningReward),
                            ];
                            result(null, {
                                message: "success",
                                reward: this.miningReward,
                            });
                        }
                        else {
                            result({ message: "wrong solution" }, null); // added error mesasge
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.addTransaction = function (transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address");
        }
        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid tranasaction to chain");
        }
        this.pendingTransactions.push(transaction);
    };
    // The add transaction functinon for requests that come from the client:
    Blockchain.prototype.addTransactionClient = function (transaction, result) {
        console.log("the transaction is : " + transaction);
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address");
        }
        if (!transaction.isValid()) {
            result({ message: "Cannot add invalid transactions to the chain" }, null);
        }
        this.pendingTransactions.push(transaction);
        result(null, {
            success: true,
            message: "Transaction: ".concat(transaction, " has been added to the pendingTransactions"),
        });
    };
    Blockchain.prototype.getBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (address === trans.fromAddress) {
                    balance -= trans.amount;
                }
                if (address === trans.toAddress) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    };
    Blockchain.prototype.isChainValid = function () {
        // traverse the entire blockchain and verify that the blocks are linked properly
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
            // confirms the hash of every block using its own data
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
    // function that gets all the transactions in all the blocks by iteration:
    Blockchain.prototype.getAllTransactions = function () {
        var count = 0;
        var transactionsArray = [];
        var transactionsArrayFormatted = [];
        for (var i = 0; i < this.chain.length; i++) {
            transactionsArray.push(this.chain[i].transactions);
        }
        return transactionsArray;
    };
    Blockchain.prototype.getBlockchain = function (result) {
        result(null, {
            chain: this.chain,
        });
    };
    Blockchain.prototype.getPendingTransactions = function () {
        var arr = [];
        if (this.pendingTransactions.length === 0) {
            console.log("Array is empty!!");
        }
        else {
            for (var i = 0; i < this.pendingTransactions.length; i++) {
                console.log(this.pendingTransactions[i]);
                arr.push(this.pendingTransactions[i]);
            }
        }
        return arr;
    };
    return Blockchain;
}());
exports.default = Blockchain;
//# sourceMappingURL=blockchain.js.map