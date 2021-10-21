"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find_Card_By_ID = void 0;
var mongodb_1 = require("mongodb");
var Card_1 = require("../../Models/Card");
/*
The original connection code

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


*/
function Find_Card_By_ID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var Myconnection, MyDocs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Connect()];
                case 1:
                    Myconnection = _a.sent();
                    return [4 /*yield*/, Find_One(Myconnection)];
                case 2:
                    MyDocs = _a.sent();
                    return [2 /*return*/, Filter_cards(MyDocs, id)];
            }
        });
    });
}
exports.Find_Card_By_ID = Find_Card_By_ID;
var Connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(process.env.URI)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var Find_One = function (db) { return __awaiter(void 0, void 0, void 0, function () {
    var dbo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dbo = db.db(process.env.DBNAME);
                return [4 /*yield*/, dbo.collection("Cards").find({}).toArray()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var Filter_cards = function (result2, id) {
    var mycard = new Card_1.Card("");
    result2.forEach(function (element) {
        console.log(result2);
        if (element['id'] === id) {
            mycard.id = element['id'];
            mycard.Account = element['account'];
            mycard.CCV = element['CCV'];
            mycard.stopped = element['stopped'];
        }
    });
    return (mycard);
};
