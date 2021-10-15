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
var CardsDB = __importStar(require("../Services/DB_Services/Cards"));
var AccountsDB = __importStar(require("../Services/DB_Services/Accounts"));
function Transactions_Home(req, res) {
    res.send("Welcoem to our bank");
}
exports.Transactions_Home = Transactions_Home;
function Validate_Transaction(req, res) {
    var transaction = new Transaction_1.Transaction();
    // console.log(req.body);
    transaction.card = Number(req.body['cardid']);
    transaction.ccv = req.body['ccv'];
    transaction.amount = Number(req.body['amount']);
    transaction.merchant = req.body['merchant'];
    transaction.timestamp = req.body['timestamp'];
    var TR = new Transaction_Response_1.Transaction_response();
    var card = new Card_1.Card(transaction.card);
    //let card=CardsDB.Find_Card_By_ID(transaction.card);
    console.log(transaction.card + " " + typeof (transaction.card));
    CardsDB.Find_Card_By_ID(transaction.card).then(function (result) {
        card = result;
        console.log(card);
        var ResSent = false;
        if (card.id != transaction.card && !ResSent) {
            TR.accepted = false;
            TR.error = "Incorrect Card Number";
            ResSent = true;
            res.send(TR);
        }
        console.log(card);
        if (card.CCV != transaction.ccv && !ResSent) {
            TR.accepted = false;
            TR.error = "Incorrect CCV card->" + card.CCV;
            ResSent = true;
            res.send(TR);
        }
        if (card.stopped && !ResSent) {
            TR.accepted = false;
            TR.error = "Card Suspended";
            ResSent = true;
            res.send(TR);
        }
        if (!ResSent) {
            var account_1 = new Account_1.Account();
            account_1 = card.Get_Account();
            AccountsDB.Find_Account_By_ID(card.Account).then(function (result) {
                console.log(result.balance.toString());
                account_1 = result;
                transaction.account = account_1.id;
                if (account_1.id === 0 && !ResSent) {
                    TR.accepted = false;
                    TR.error = "Card doesn't belong to the bank";
                    ResSent = true;
                    res.send(TR);
                }
                if (account_1.balance < transaction.amount && !ResSent) {
                    TR.accepted = false;
                    TR.error = "Not enough balance";
                    ResSent = true;
                    res.send(TR);
                }
                var client = new Client_1.Client();
                client = account_1.Get_Client();
                transaction.client = client.id;
                transaction.deduct();
                transaction.insert();
                TR.error = "No errors";
                TR.accepted = true;
                ResSent = true;
                res.send(TR);
                console.log(ResSent);
            });
        }
    }).catch(function (err) {
        console.log(err);
        TR.accepted = false;
        TR.error = "Incorrect Card Number";
        res.send(TR);
    }).finally(function () {
    });
}
exports.Validate_Transaction = Validate_Transaction;
