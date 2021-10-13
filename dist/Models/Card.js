"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Account_1 = require("./Account");
var Card = /** @class */ (function () {
    function Card(id) {
        this.id = id;
        this.Account = 0;
        this.CCV = "";
        this.stopped = false;
    }
    Card.prototype.Get_Account = function () {
        return new Account_1.Account();
    };
    return Card;
}());
exports.Card = Card;
