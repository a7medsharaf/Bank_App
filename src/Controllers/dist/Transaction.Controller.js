"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreateTransaction = exports.Transactions_Home = void 0;
var Card_1 = require("../Models/Card");
var Transaction_Response_1 = require("../Models/Transaction_Response");
var CardsDB = require("../Services/DB_Services/Cards");
var AccountsDB = require("../Services/DB_Services/Accounts");
var transaction = require("../Services/DB_Services/Transaction");
function Transactions_Home(req, res) {
    res.send("Welcoem to our bank");
}
exports.Transactions_Home = Transactions_Home;
function deduct(Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID, account) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionForClientid, temp, transactionForGatewayid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // INSERT TRANSACTION 1 AND 2 
                    clientID = account.client;
                    return [4 /*yield*/, transaction.insert_One({ Payment_gateway: Payment_gateway, clientID: clientID, clientID2: clientID2, T_type: T_type, accountID: accountID, cardID: cardID, amount: amount, merchant: merchant, timestamp: timestamp, Cooresponding_TID: Cooresponding_TID })];
                case 1:
                    transactionForClientid = _a.sent();
                    T_type = "C";
                    Payment_gateway = 0;
                    temp = clientID;
                    clientID = clientID2;
                    clientID2 = temp;
                    Cooresponding_TID = transactionForClientid.toString();
                    return [4 /*yield*/, transaction.insert_One({ Payment_gateway: Payment_gateway, clientID: clientID, clientID2: clientID2, T_type: T_type, accountID: accountID, cardID: cardID, amount: amount, merchant: merchant, timestamp: timestamp, Cooresponding_TID: Cooresponding_TID })];
                case 2:
                    transactionForGatewayid = _a.sent();
                    transaction.updateone(transactionForClientid, transactionForGatewayid.toString());
                    return [2 /*return*/];
            }
        });
    });
}
function CreateTransaction(req, res) {
    //let transaction = new Transaction();
    var Payment_gateway = Number(req.body['Payment_gateway_ID']);
    var clientID;
    var clientID2 = 13;
    var T_type = "D";
    var accountID;
    var cardID = Number(req.body['cardid']);
    var amount = Number(req.body['amount']);
    var merchant = req.body['merchant'];
    var timestamp = req.body['timestamp'];
    var ccv = req.body['ccv'];
    var Cooresponding_TID;
    var account;
    var TR = new Transaction_Response_1.Transaction_response();
    var card = new Card_1.Card(cardID);
    CardsDB.Find_Card_By_ID(cardID).then(function (result) {
        card = result;
        console.log(card);
        var ResSent = false;
        if (card.id != cardID) {
            TR.accepted = false;
            TR.error = "Incorrect Card Number";
            ResSent = true;
            throw new Error("Incorrect Card Number");
        }
        if (card.CCV != ccv) {
            TR.accepted = false;
            console.log("ccv");
            TR.error = "Incorrect CCV card->" + card.CCV;
            ResSent = true;
            throw new Error("Incorrect CCV card->" + card.CCV);
        }
        if (card.stopped) {
            TR.accepted = false;
            TR.error = "Card Suspended";
            ResSent = true;
            throw new Error("Card Suspended");
        }
        AccountsDB.Find_Account_By_ID(card.Get_Account()).then(function (result) {
            console.log(result.balance.toString());
            account = result;
            accountID = account.id;
            if (account.id === 0) {
                TR.accepted = false;
                TR.error = "Card doesn't belong to the bank";
                ResSent = true;
                throw new Error("Card doesn't belong to the bank");
            }
            else if (account.balance < amount) {
                TR.accepted = false;
                TR.error = "Not enough balance";
                ResSent = true;
                throw new Error("Not enough balance");
            }
            console.log(Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID, account);
            deduct(Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID, account);
            // UPDATE BALANCE HERE
            TR.error = "No errors";
            TR.accepted = true;
            TR.Payment_gateway_Balance = 0;
            ResSent = true;
            res.send(TR);
            console.log(ResSent);
        })["catch"](function (e) {
            console.log(e);
            return res.status(404).send(e.message);
        });
    })["catch"](function (err) {
        console.log(err);
        return res.status(404).send(err);
    })["finally"](function () {
    });
}
exports.CreateTransaction = CreateTransaction;
