"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Transaction_Response_1 = require("./Transaction_Response");
var Card = /** @class */ (function () {
    function Card(id) {
        this.id = id;
        this.Account = 0;
        this.CCV = "";
        this.stopped = false;
    }
    Card.prototype.Validate_Against_Transaction = function (T) {
        var TR = new Transaction_Response_1.Transaction_response();
        TR.accepted = true;
        TR.error = "No Errors";
        console.log(T);
        console.log(this);
        if (this.id != T.card) {
            TR.accepted = false;
            TR.error = "Incorrect Card Number";
            return TR;
        }
        if (this.CCV != T.ccv) {
            TR.accepted = false;
            TR.error = "Incorrect CCV card->" + T.ccv;
            return TR;
        }
        if (this.stopped) {
            TR.accepted = false;
            TR.error = "Card Suspended";
            return TR;
        }
        return TR;
    };
    return Card;
}());
exports.Card = Card;
