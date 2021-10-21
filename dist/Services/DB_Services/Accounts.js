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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_balance = exports.Find_Account_By_Paymentid = exports.Find_Account_By_ID = void 0;
var mongodb_1 = require("mongodb");
var Account_1 = require("../../Models/Account");
function Find_Account_By_ID(id) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            return Find_One(result);
        }).then(function (result2) {
            resolve(Filter_Accouns(result2, id));
        });
    });
}
exports.Find_Account_By_ID = Find_Account_By_ID;
function Find_Account_By_Paymentid(id) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            return Find_One(result);
        }).then(function (result2) {
            resolve(Filter_Accouns_by_Paymentid(result2, id));
        });
    });
}
exports.Find_Account_By_Paymentid = Find_Account_By_Paymentid;
function update_balance(acc, Added_Val) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            return update_one(result, acc, Added_Val);
        }).then(function (result2) {
            resolve(result2);
        });
    });
}
exports.update_balance = update_balance;
var Filter_Accouns = function (result2, id) {
    var myAccount = new Account_1.Account();
    result2.forEach(function (element) {
        if (element['id'] === id) {
            myAccount.id = element['id'];
            myAccount.balance = element['Balance'];
            myAccount.client = element['client'];
        }
    });
    return (myAccount);
};
var Filter_Accouns_by_Paymentid = function (result2, id) {
    var myAccount = new Account_1.Account();
    result2.forEach(function (element) {
        if (element['Payment_Gateway_ID'] === id) {
            myAccount.id = element['id'];
            myAccount.balance = element['Balance'];
            myAccount.client = element['client'];
            myAccount.Payment_Gateway_ID = element['Payment_Gateway_ID'];
        }
    });
    return (myAccount);
};
var Connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(process.env.URI)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var Find_One = function (db) { return __awaiter(void 0, void 0, void 0, function () {
    var dbo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dbo = db.db(process.env.DBNAME);
                return [4 /*yield*/, dbo.collection("Accounts").find({}).toArray()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/*
const update_onee=async(db:MongoClient,acc:Account,Added_Val:number):Promise<Account>=>
{
  let dbo:Db = db.db(process.env.DBNAME as string);
  let account_new:Account =new Account();
  account_new=acc;
  account_new.balance=Number(acc.balance) + Number(Added_Val);
  return await dbo.collection("Accounts").updateOne({id:acc.id},{$set:{Balance:acc.balance} });

}
*/
function update_one(db, acc, Added_Val) {
    return new Promise(function (resolve, reject) {
        var dbo = db.db(process.env.DBNAME);
        var account_new = new Account_1.Account();
        account_new = acc;
        account_new.balance = Number(acc.balance) + Number(Added_Val);
        var account;
        dbo.collection("Accounts").updateOne({ id: acc.id }, { $set: { Balance: acc.balance } }, function (err, res) {
            if (err)
                reject(err);
            else {
                console.log(account_new);
                resolve(account_new);
            }
            db.close();
        });
    });
}
