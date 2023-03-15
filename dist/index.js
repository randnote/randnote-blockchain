"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_API = exports.FRONTEND_API = exports.BLOCKCHAIN_API = void 0;
var express_1 = __importDefault(require("express"));
var level = require("level");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// set environmental variables
var BLOCKCHAIN_API = "";
exports.BLOCKCHAIN_API = BLOCKCHAIN_API;
var FRONTEND_API = "";
exports.FRONTEND_API = FRONTEND_API;
var BACKEND_API = "";
exports.BACKEND_API = BACKEND_API;
if (process.env.NODE_ENV == "development") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "http://localhost:8034";
    exports.FRONTEND_API = FRONTEND_API = "http://localhost:3002";
    exports.BACKEND_API = BACKEND_API = "http://localhost:8024";
}
else if (process.env.NODE_ENV == "production") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "https://blockchain.randnotex.co.za";
    exports.FRONTEND_API = FRONTEND_API = "https://randnotex.co.za";
    exports.BACKEND_API = BACKEND_API = "https://backend.randnotex.co.za";
}
var allowedOrigins = ["".concat(FRONTEND_API), "".concat(FRONTEND_API, "/admin")];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            // return callback(new Error(msg), false);
            return callback(null, true); // allow all of em
        }
        return callback(null, true);
    },
}));
require("./routes/index")(app);
app.listen(8034, function () { return console.log("server started on port 8034"); });
//# sourceMappingURL=index.js.map