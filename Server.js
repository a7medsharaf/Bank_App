"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transactions_Server_1 = require("./dist/Servers/Transactions_Server");
console.log(process.env.PORT);
var TS = new Transactions_Server_1.Transactions_Server(process.env.PORT);
