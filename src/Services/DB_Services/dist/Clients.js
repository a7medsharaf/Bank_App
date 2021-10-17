"use strict";
exports.__esModule = true;
exports.Find_Client_By_ID = void 0;
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
var Client_1 = require("../../Models/Client");
function Find_Client_By_ID(id) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            Find_One(result).then(function (result2) {
                result2.forEach(function (element) {
                    if (element['id'] === id) {
                        var myclient = new Client_1.Client();
                        //  console.log(element);
                        myclient.id = element['id'];
                        myclient.name = element['Name'];
                        myclient.address = element['Address'];
                        // console.log(myclient);
                        resolve(myclient);
                    }
                });
                reject("Client not found");
            });
        });
    });
}
exports.Find_Client_By_ID = Find_Client_By_ID;
function Connect() {
    return new Promise(function (resolve, reject) {
        dotenv.config();
        mongodb_1.MongoClient.connect(process.env.URI, function (err, db) {
            if (err)
                reject(err);
            //console.log(process.env.DBNAME as string +" "+process.env.URI as string);
            if (db != undefined) {
                resolve(db);
            }
        });
    });
}
function Find_One(db) {
    return new Promise(function (resolve, reject) {
        var dbo = db.db(process.env.DBNAME);
        dbo.collection("Clients").find({}).toArray(function (err, result) {
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
