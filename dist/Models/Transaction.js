"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction() {
        this.client = 0;
        this.account = 0;
        this.card = 0;
        this.amount = 0;
        this.merchant = "";
        this.timestamp = "";
        this.ccv = "";
    }
    Transaction.prototype.deduct = function () {
        //decrease balance by amount
    };
    Transaction.prototype.insert = function () {
        //add transaction to the database
    };
    return Transaction;
}());
exports.Transaction = Transaction;
