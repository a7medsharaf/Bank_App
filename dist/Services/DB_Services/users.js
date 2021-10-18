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
exports.Find_User_By_Username = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
var User_1 = require("../../Models/User");
function Find_User_By_Username(Username) {
    return new Promise(function (resolve, reject) {
        Connect().then(function (result) {
            return Find_One(result);
        }).then(function (result2) {
            resolve(Filter_Users(result2, Username));
        });
    });
}
exports.Find_User_By_Username = Find_User_By_Username;
var Filter_Users = function (result2, Username) {
    var myuser = new User_1.User();
    result2.forEach(function (element) {
        if (element['Username'] === Username) {
            myuser.Username = element['Username'];
            myuser.Password = element['Password'];
        }
    });
    return (myuser);
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
        dbo.collection("Users").find({}).toArray(function (err, result) {
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
