"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(id) {
        this.id = id;
        this.Account = 0;
        this.CCV = "";
        this.stopped = false;
    }
    Card.prototype.Get_Account = function () {
        return this.Account;
    };
    return Card;
}());
exports.Card = Card;
