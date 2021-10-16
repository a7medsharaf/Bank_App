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
exports.Find_Account_By_ID = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
var Account_1 = require("../../Models/Account");
function Find_Account_By_ID(id) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            Find_One(result).then(function (result2) {
                result2.forEach(function (element) {
                    if (element['id'] === id) {
                        var myAccount = new Account_1.Account();
                        console.log(element);
                        myAccount.id = element['id'];
                        myAccount.balance = element['Balance'];
                        myAccount.client = element['client'];
                        console.log(myAccount);
                        resolve(myAccount);
                    }
                });
                reject("Account not found");
            });
        });
    });
}
exports.Find_Account_By_ID = Find_Account_By_ID;
function Connect() {
    return new Promise(function (resolve, reject) {
        dotenv.config();
        mongodb_1.MongoClient.connect(process.env.URI, function (err, db) {
            if (err)
                reject(err);
            console.log(process.env.DBNAME + " " + process.env.URI);
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
