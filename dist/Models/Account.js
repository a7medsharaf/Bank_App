"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var Client_1 = require("./Client");
var Account = /** @class */ (function () {
    function Account() {
        this.id = 0;
        this.client = 0;
        this.balance = 0;
    }
    Account.prototype.Get_Client = function () {
        return new Client_1.Client();
    };
    return Account;
}());
exports.Account = Account;
