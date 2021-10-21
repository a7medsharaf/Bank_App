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
exports.Find_Client_By_ID = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
var Client_1 = require("../../Models/Client");
function Find_Client_By_ID(id) {
    return new Promise(function (resolve, reject) {
        console.log("client id  " + id);
        Connect().then(function (result) {
            return Find_One(result);
        }).then(function (result2) {
            console.log(result2);
            resolve(Filter_clients(result2, id));
        });
    });
}
exports.Find_Client_By_ID = Find_Client_By_ID;
var Filter_clients = function (result2, id) {
    var myclient = new Client_1.Client();
    console.log(id);
    console.log(result2);
    result2.forEach(function (element) {
        if (element['id'] === id) {
            myclient.id = element['id'];
            myclient.name = element['Name'];
            myclient.address = element['Address'];
        }
    });
    return (myclient);
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
