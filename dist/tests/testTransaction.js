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
var axios_1 = __importDefault(require("axios"));
/* for now , I dont just use the private and public key strings in the json sent to the server, instead; i use
now generate the keys on the fly.. however this should not be the case... i should be able to use the strings... or atleast use
the strings but replicate the format in which the "signTransaction " file desires...
 */
var elliptic_1 = __importDefault(require("elliptic"));
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
var createTransaction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var jsonn, snack;
    return __generator(this, function (_a) {
        jsonn = {
            fromAddress: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmo5PDZRSywDapAlBY/ze\n\t\t\tcjC7lleFp3UasKbSMbA6jVIjVmXS1iYVv6Rugdue0mRnYs/dhbXZr9MjJdJK0O+u\n\t\t\t+efeXFcLNEMp6PHcZ2r9JHimvze1Ed415tHPduTAwfXzrsbuzzw8IAtL8PdQ3Xkh\n\t\t\tWinDFWtQRKzs+16ngsvQ64y8U1N/CT7GkOXNaqSz0R6C4jTcJB8ONMemc06sZG9N\n\t\t\tkkb8PGlqerYfaHhcLHJvYtVCdW2uWIT/8dPwb61fVPvMBtF+OZzbwMQCa8QN3YTS\n\t\t\tF5a3Jw5azZynJGEKAy8GakodIHxz9Hs+GvPy/Lapyh5hWOgf7EWYuNX4vcdAnO3/\n\t\t\tyQIDAQAB",
            fromAddressPrivateKey: "MIIEpAIBAAKCAQEAmo5PDZRSywDapAlBY/zecjC7lleFp3UasKbSMbA6jVIjVmXS\n\t\t\t1iYVv6Rugdue0mRnYs/dhbXZr9MjJdJK0O+u+efeXFcLNEMp6PHcZ2r9JHimvze1\n\t\t\tEd415tHPduTAwfXzrsbuzzw8IAtL8PdQ3XkhWinDFWtQRKzs+16ngsvQ64y8U1N/\n\t\t\tCT7GkOXNaqSz0R6C4jTcJB8ONMemc06sZG9Nkkb8PGlqerYfaHhcLHJvYtVCdW2u\n\t\t\tWIT/8dPwb61fVPvMBtF+OZzbwMQCa8QN3YTSF5a3Jw5azZynJGEKAy8GakodIHxz\n\t\t\t9Hs+GvPy/Lapyh5hWOgf7EWYuNX4vcdAnO3/yQIDAQABAoIBAA/aiiRf8xAswcCy\n\t\t\tzFjXzu+SrSNSTfzr57V4HzaGl7L4WnSZ1EMwO+nhEY7Tetqk/u/lV5lIGpDNDR1r\n\t\t\tkU4WT/IFhUseiKEvRITHDm8zS80qbRxPOA0hqJDJM8lD1LvwoTLr6AIs8RPuZLdO\n\t\t\tfyaArtmjUAYJ8H1i6ZotTux9QKxwpe/oNUgRklOAfezYpd4nCRiykK+2gHJ0niX2\n\t\t\tMhxS+Zqcgv6q23+73W+KkYrhdAEcPpdNYvadX39ocCUrRofJ7/5n267WRjuNFo57\n\t\t\ttxK3NbyXc1rjm9KO5tVXRdxG9S2XN4y2zouynPLV6W9R14+JCNu0qUridAlUJifH\n\t\t\tCvG5FMECgYEAxoXNv37Q+rG6Oz5HG1qOZf01gA/RndI3sYbn+tZ/4naEYjWLN2Me\n\t\t\tXlzHLlF2WqpK5OMz4jhbYyMJSSLt00hSE/84waM+YQswR4t4CqLNkzS3T+DK16HX\n\t\t\tOdu3RVXgXyOKqsAIsXlbyrsCtpMKnIsQe3jUvdmUK+/qitahjK3RexECgYEAx03B\n\t\t\tQwFN9vBLaNerp1KF3A14tZ3Je2ReY+he2JsWxyWoJntm1AAQWbJ8rmGGeNCFp6MY\n\t\t\ttr45aXHbcftyut4hDd7RQ7+ra2NnqoSC3cKdyk7/KkFyphDgnvOMRE3EzTjozCfP\n\t\t\t4w8jT3J+PWnBuXQd26QxRtzCyvyWrjSifHCWCTkCgYEAo43PAYpQT4mm/XIEkSOd\n\t\t\tF6dxsUzXDGgJnEehzUV03LV5wZONW5dciK91JdLVaELOKx6IO0Lk/5r45nlRaHU3\n\t\t\tsePd9aIxHTBjmT3tKw4Pwcx3jeaMFvTt5Wv/5K6oiJk2gBBv2Q87sZ060gH4hxoG\n\t\t\t/UKCOtsLuNsS50mGlOkLIZECgYAzefrDsq+Pa0se3i2AvwjB6FzYE9P5YdgbV+Y/\n\t\t\tbfc5IpnGrrLFaOrQMBCR/bB8veb3gGGeuY0clgLG8toUN9Ezwuwr4nKE/xzEZwth\n\t\t\t+aVFnpe7M0JIcC2EAIWnEqsVEnDWYiYIkF1fZMQEWq9llf8sPsFXeyd4xDqq7f9V\n\t\t\twsKNyQKBgQCbBrQSvf68JZaAr+ql3vKzzA08swnRcpEQrKcjLhQw+NJy1ViNU3k9\n\t\t\t+1r6FTkrWjlyEvT5pxgvEQR5QKKAX7ieh8SDivGzZbzsgvz25qPy+dJlPxajGQeg\n\t\t\ts6Ogr12si1Pc4SHkYf0II2a6tXF7eZnLOp8vtS9/PuY/M9W8yvWJSg==",
            toAddress: "paul",
            amount: 10,
        };
        snack = JSON.stringify(jsonn);
        // console.log)
        axios_1.default.post("http://localhost:8033/transaction", { obj: snack }).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //
                console.log(response.data);
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); };
createTransaction();
//# sourceMappingURL=testTransaction.js.map