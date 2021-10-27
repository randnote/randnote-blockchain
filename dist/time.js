"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
// getting the current time in local time...
var getTimeFormatted = function () {
    var time = moment_1.default(Date.now()).format("YYYY-MM-DD");
    console.log(time);
    return time;
};
exports.default = getTimeFormatted;
//# sourceMappingURL=time.js.map