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
exports.FindCustomer = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var url = process.env.URI;
var dbname = process.env.DBNAME;
function FindCustomer() {
    console.log(url + " " + dbname);
    mongodb_1.MongoClient.connect(url, function (err, db) {
        if (err)
            throw err;
        if (db != undefined) {
            var dbo = db.db(dbname);
            var query = { id: 11 };
            dbo.collection("Clients").find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                console.log(result);
                db.close();
            });
        }
    });
}
exports.FindCustomer = FindCustomer;
