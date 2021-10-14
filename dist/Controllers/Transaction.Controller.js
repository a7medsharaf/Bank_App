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
    var TR = new Transaction_Response_1.Transaction_response();
    var card = new Card_1.Card(transaction.card);
    var ResSent = false;
    if (card.id != transaction.card && !ResSent) {
        TR.accepted = false;
        TR.error = "Incorrect Card Number";
        ResSent = true;
        res.send(TR);
    }
    if (card.CCV != transaction.ccv && !ResSent) {
        TR.accepted = false;
        TR.error = "Incorrect CCV";
        ResSent = true;
        res.send(TR);
    }
    if (card.stopped && !ResSent) {
        TR.accepted = false;
        TR.error = "Card Suspended";
        ResSent = true;
        res.send(TR);
    }
    var account = new Account_1.Account();
    account = card.Get_Account();
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
    var client = new Client_1.Client();
    client = account.Get_Client();
    transaction.client = client.id;
    transaction.deduct();
    transaction.insert();
}
exports.Validate_Transaction = Validate_Transaction;
