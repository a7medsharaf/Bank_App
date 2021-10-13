"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions_Server = void 0;
var express_1 = __importDefault(require("express"));
var Transactions_Router_1 = require("../Routers/Transactions_Router");
var Transactions_Server = /** @class */ (function () {
    function Transactions_Server(port) {
        var app = (0, express_1.default)();
        var TR = new Transactions_Router_1.Transactions_Router();
        app.use(TR.getPath(), TR.getRouter());
        app.listen(port);
    }
    return Transactions_Server;
}());
exports.Transactions_Server = Transactions_Server;
