"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate_Transaction = void 0;
var Account_1 = require("../Models/Account");
var Card_1 = require("../Models/Card");
var Client_1 = require("../Models/Client");
var Transaction_1 = require("../Models/Transaction");
var Transaction_Response_1 = require("../Models/Transaction_Response");
function Validate_Transaction(req, res) {
    var transaction = new Transaction_1.Transaction();
    transaction.card = Number(req.params['cardid']);
    transaction.ccv = req.params['ccv'];
    transaction.amount = Number(req.params['amount']);
    transaction.merchant = req.params['merchant'];
    transaction.timestamp = req.params['timestamp'];
    var card = new Card_1.Card(transaction.card);
    var account = new Account_1.Account();
    account = card.Get_Account();
    transaction.account = account.id;
    var client = new Client_1.Client();
    client = account.Get_Client();
    transaction.client = client.id;
    var TR = new Transaction_Response_1.Transaction_response();
    if (card.CCV != transaction.ccv) {
        TR.accepted = false;
        TR.error = "Incorrect CCV";
        res.send(TR);
    }
    if (account.balance < transaction.amount) {
        TR.accepted = false;
        TR.error = "Not enough balance";
        res.send(TR);
    }
    if (card.stopped) {
        TR.accepted = false;
        TR.error = "Card Suspended";
        res.send(TR);
    }
    transaction.deduct();
    transaction.insert();
    res.send(TR);
}
exports.Validate_Transaction = Validate_Transaction;
