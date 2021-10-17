"use strict";
exports.__esModule = true;
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(Payment_gateway, clientID, clientID2, T_type, account, card, amount, merchant, timestamp, Cooresponding_TID) {
        if (Payment_gateway === void 0) { Payment_gateway = 0; }
        if (clientID === void 0) { clientID = 0; }
        if (clientID2 === void 0) { clientID2 = 0; }
        if (T_type === void 0) { T_type = ""; }
        if (account === void 0) { account = 0; }
        if (card === void 0) { card = 0; }
        if (amount === void 0) { amount = 0; }
        if (merchant === void 0) { merchant = ""; }
        if (timestamp === void 0) { timestamp = ""; }
        if (Cooresponding_TID === void 0) { Cooresponding_TID = ""; }
        this.clientID = clientID;
        this.T_type = T_type;
        this.account = account;
        this.card = card;
        this.amount = amount;
        this.merchant = merchant;
        this.timestamp = timestamp;
        this.Cooresponding_TID = "";
        this.Payment_gateway = Payment_gateway;
        this.clientID2 = clientID2;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
