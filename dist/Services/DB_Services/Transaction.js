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
exports.Filter_Transactions = exports.Get_All_Transactions = exports.updateone = exports.insert_One = void 0;
var mongodb_1 = require("mongodb");
var dotenv = __importStar(require("dotenv"));
var Transaction_1 = require("../../Models/Transaction");
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
function Get_All(db) {
    return new Promise(function (resolve, reject) {
        var dbo = db.db(process.env.DBNAME);
        dbo.collection("Transactions").find({}).toArray(function (err, result) {
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
function Get_All_Transactions() {
    return new Promise(function (resolve, reject) {
        Connect().then(function (res) {
            return Get_All(res);
        }).then(function (res) { return resolve(res); });
    });
}
exports.Get_All_Transactions = Get_All_Transactions;
function Filter_Transactions(Portalid) {
    return __awaiter(this, void 0, void 0, function () {
        var Docs, Result, temp;
        return __generator(this, function (_a) {
            Docs = new Array(0);
            Result = new Array(0);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    Get_All_Transactions().then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i]['Payment_gateway'] === Portalid) {
                                temp = new Transaction_1.Transaction();
                                temp.Payment_gateway_ID = result[i]['accPayment_gatewayountID'];
                                temp.account = result[i]['accountID'];
                                temp.client = result[i]['clientID2'];
                                temp.amount = result[i]['amount'];
                                temp.card = result[i]['cardID'];
                                temp.merchant = result[i]['merchant'];
                                temp.timestamp = result[i]['timestamp'];
                                Result.push(temp);
                            }
                        }
                    }).finally(function () { resolve(Result); });
                })];
        });
    });
}
exports.Filter_Transactions = Filter_Transactions;
