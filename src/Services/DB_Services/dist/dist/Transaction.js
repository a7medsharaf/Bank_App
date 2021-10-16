"use strict";
exports.__esModule = true;
exports.Account = void 0;
var Account = /** @class */ (function () {
    function Account() {
        this.id = 0;
        this.client = 0;
        this.balance = 0;
    }
    Account.prototype.Get_Client = function () {
        return this.client;
    };
    /**check if the amount you want to subtract is more than the balance  */
    Account.prototype.check_Balance = function (amount) {
        if (amount > this.balance)
            return false;
        else
            return true;
    };
    Account.prototype.Get_Balance = function () {
        return this.balance;
    };
    /** /amount is send as positive or nigative value added or subtracted from the balance  */
    Account.prototype.deduct_Balance = function (amount) {
        if (this.check_Balance(amount)) {
            this.balance = this.balance - amount;
            return "balance deducted";
        }
        else
            return "balance canot be deducted as the amount is larger than the current balance ";
        ;
    };
    Account.prototype.Add_Balance = function (amount) {
        this.balance = this.balance + amount;
    };
    return Account;
}());
exports.Account = Account;
