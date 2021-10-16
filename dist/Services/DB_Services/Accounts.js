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
exports.update_balance = exports.Find_Account_By_Paymentid = exports.Find_Account_By_ID = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
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
function Connect() {
    return new Promise(function (resolve, reject) {
        dotenv.config();
        mongodb_1.MongoClient.connect(process.env.URI, function (err, db) {
            if (err)
                reject(err);
            if (db != undefined) {
                resolve(db);
            }
        });
    });
}
function Find_One(db) {
    return new Promise(function (resolve, reject) {
        var dbo = db.db(process.env.DBNAME);
        dbo.collection("Accounts").find({}).toArray(function (err, result) {
            if (err)
                reject(err);
            if (result != undefined) {
                resolve(result);
            }
            // @ts-ignore
            db.close();
        });
    });
}
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
