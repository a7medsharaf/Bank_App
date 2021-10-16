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
var Transactions_Server_1 = require("./Servers/Transactions_Server");
var dotenv = __importStar(require("dotenv"));
// @ts-ignore
//import * as dbf2 from "./Services/Generic_DB_Services/FA"
dotenv.config();
var PORT = parseInt(process.env.PORT, 10);
//console.log(PORT);
//console.log(__dirname);
var TS = new Transactions_Server_1.Transactions_Server(PORT);
//ClientsDB.Find_Client_By_ID(11).then((result)=>{console.log(result.name)}).catch((err)=>{console.log(err)});
//CardsDB.Find_Card_By_ID(31).then((result)=>{console.log(result.Account)}).catch((err)=>{console.log(err)});
//AccountsDB.Find_Account_By_ID(21).then((result)=>{console.log(result.balance.toString())}).catch((err)=>{console.log(err)});
