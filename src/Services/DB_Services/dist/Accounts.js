"use strict";
exports.__esModule = true;
exports.Find_Account_By_clientID = exports.Find_Account_By_ID = void 0;
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
var Account_1 = require("../../Models/Account");
function Find_Account_By_ID(id) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            Find_One(result).then(function (result2) {
                result2.forEach(function (element) {
                    if (element['id'] === id) {
                        var myAccount = new Account_1.Account();
                        // console.log(element);
                        myAccount.id = element['id'];
                        myAccount.balance = element['Balance'];
                        myAccount.client = element['client'];
                        //console.log(myAccount);
                        resolve(myAccount);
                    }
                });
                reject("Account not found");
            });
        });
    });
}
exports.Find_Account_By_ID = Find_Account_By_ID;
function Find_Account_By_clientID(Cid) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            Find_One(result).then(function (result2) {
                result2.forEach(function (element) {
                    if (element['client'] === Cid) {
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
exports.Find_Account_By_clientID = Find_Account_By_clientID;
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
