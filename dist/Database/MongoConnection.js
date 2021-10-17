"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongo = void 0;
var mongodb_1 = require("mongodb");
var url = "mongodb+srv://sharaf:<password>@cluster0.ybpqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var ConnectToMongo = function () {
    return new Promise(function (resolve, reject) {
        mongodb_1.MongoClient.connect(url, function (err, mongoClient) {
            if (err)
                return reject(err);
            if (mongoClient)
                return resolve({ mongoClient: mongoClient, db: mongoClient.db("fintech") });
            return reject(new Error("cant connect to db"));
        });
    });
};
exports.ConnectToMongo = ConnectToMongo;
