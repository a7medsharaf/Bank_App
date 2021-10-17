"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate_Transaction = exports.Transactions_Home = void 0;
var Account_1 = require("../Models/Account");
var Card_1 = require("../Models/Card");
var Client_1 = require("../Models/Client");
var Transaction_1 = require("../Models/Transaction");
var Transaction_Response_1 = require("../Models/Transaction_Response");
var ClientsDB = __importStar(require("../Services/DB_Services/Clients"));
var CardsDB = __importStar(require("../Services/DB_Services/Cards"));
var AccountsDB = __importStar(require("../Services/DB_Services/Accounts"));
var TransactionDB = __importStar(require("../Services/DB_Services/Transaction"));
function Transactions_Home(req, res) {
    res.send("Welcoem to our bank");
}
exports.Transactions_Home = Transactions_Home;
function Validate_Transaction(req, res) {
    var transaction = new Transaction_1.Transaction();
    transaction.card = Number(req.body['cardid']);
    transaction.ccv = req.body['ccv'];
    transaction.amount = Number(req.body['amount']);
    transaction.merchant = req.body['merchant'];
    transaction.Payment_gateway_ID = Number(req.body['Payment_gateway_ID']);
    transaction.timestamp = req.body['timestamp'];
    var account = new Account_1.Account();
    var TR = new Transaction_Response_1.Transaction_response();
    var ResSent = false;
    var card = new Card_1.Card(transaction.card);
    var client = new Client_1.Client();
    var payment_account = new Account_1.Account();
    var TID_Debit;
    var newbalance = 0;
    var operation_date_time = new Date().toUTCString();
    CardsDB.Find_Card_By_ID(transaction.card).then(function (result) {
        card = result;
        if (card.id != transaction.card && !ResSent) {
            TR.accepted = false;
            TR.error = "Incorrect Card Number";
            ResSent = true;
            res.send(TR);
        }
        if (card.CCV != transaction.ccv && !ResSent) {
            TR.accepted = false;
            TR.error = "Incorrect CCV card->" + transaction.ccv;
            ResSent = true;
            res.send(TR);
        }
        if (card.stopped && !ResSent) {
            TR.accepted = false;
            TR.error = "Card Suspended";
            ResSent = true;
            res.send(TR);
        }
        return AccountsDB.Find_Account_By_ID(card.Account);
    }).then((function (result) {
        account = result;
        transaction.account = account.id;
        if (account.id === 0 && !ResSent) {
            TR.accepted = false;
            TR.error = "Card doesn't belong to the bank";
            ResSent = true;
            res.send(TR);
        }
        if (account.balance < transaction.amount && !ResSent) {
            TR.accepted = false;
            TR.error = "Not enough balance";
            ResSent = true;
            res.send(TR);
        }
        return ClientsDB.Find_Client_By_ID(account.client);
    })).then(function (result) {
        if (!ResSent) {
            TR.Client_name = result.name;
            transaction.client = result.id;
            client = result;
        }
    })
        .catch(function (err) {
        TR.accepted = false;
        TR.error = err;
        res.send(TR);
    }).finally(function () {
        if (!ResSent) {
            AccountsDB.update_balance(account, transaction.amount * -1).then(function (result) {
                return AccountsDB.Find_Account_By_Paymentid(transaction.Payment_gateway_ID);
            }).then(function (result) {
                payment_account = result;
                return AccountsDB.update_balance(result, transaction.amount);
            }).then(function (result) {
                newbalance = result.balance;
                var Debit_Transaction = {
                    Payment_gateway: transaction.Payment_gateway_ID,
                    clientID: client.id,
                    clientID2: payment_account.client,
                    T_type: 'D',
                    accountID: account.id,
                    cardID: transaction.card,
                    amount: transaction.amount,
                    merchant: transaction.merchant,
                    timestamp: operation_date_time,
                    Cooresponding_TID: ''
                };
                return TransactionDB.insert_One(Debit_Transaction);
            }).then(function (result_objectid) {
                TID_Debit = result_objectid;
                var Credit_Transaction = {
                    Payment_gateway: transaction.Payment_gateway_ID,
                    clientID: payment_account.client,
                    clientID2: client.id,
                    T_type: 'C',
                    accountID: payment_account.id,
                    cardID: transaction.card,
                    amount: transaction.amount,
                    merchant: transaction.merchant,
                    timestamp: operation_date_time,
                    Cooresponding_TID: TID_Debit.toString()
                };
                return TransactionDB.insert_One(Credit_Transaction);
            }).then(function (result) {
                TransactionDB.updateone(TID_Debit, result.toString());
                TR.error = "No errors";
                TR.accepted = true;
                TR.Payment_gateway_Balance = newbalance;
                ResSent = true;
                res.send(TR);
            });
            {
            }
            ;
        }
    });
}
exports.Validate_Transaction = Validate_Transaction;
