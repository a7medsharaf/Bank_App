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
exports.updateone = exports.insert_One = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
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
        console.log("done");
        // // let newData = req.body
        // db((err, dbCilent) => {
        //     if (err) res.send('database error')
        //     dbCilent.collection("Transactions").updateOne(
        //         { _id: id },
        //         { $set: { Cooresponding_TID: Cooresponding_TID } }
        //     )
        //         .then(res.redirect('/all'))
        //         .catch(e => { res.send('error in edit') })
    });
}
exports.updateone = updateone;
