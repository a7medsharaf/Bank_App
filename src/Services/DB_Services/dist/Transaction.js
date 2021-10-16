"use strict";
exports.__esModule = true;
exports.updateone = exports.insert_One = void 0;
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
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
function insert_One(data) {
    return new Promise(function (resolve, reject) {
        var _id = new mongodb_1.ObjectId;
        Connect().then(function (db) {
            var dbo = db.db(process.env.DBNAME);
            return dbo.collection('Transactions').insertOne({
                Payment_gateway: data.Payment_gateway,
                clientID: data.clientID, clientID2: data.clientID2, T_type: data.T_type, accountID: data.accountID,
                cardID: data.cardID, amount: data.amount, merchant: data.merchant,
                timestamp: data.timestamp, Cooresponding_TID: data.Cooresponding_TID
            }, function (err, res) {
                if (err)
                    return reject(err);
                if (res)
                    return resolve(res.insertedId);
                db.close();
            });
        });
    });
}
exports.insert_One = insert_One;
function updateone(id, Cooresponding) {
    // let _id = new ObjectId(id)
    Connect().then(function (db) {
        var dbo = db.db(process.env.DBNAME);
        dbo.collection('Transactions').updateOne({ _id: id }, { $set: { Cooresponding_TID: Cooresponding } });
    });
}
exports.updateone = updateone;
