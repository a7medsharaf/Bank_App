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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.check_user = void 0;
var User_1 = require("../Models/User");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var dotenv = __importStar(require("dotenv"));
var UsersDB = __importStar(require("../Services/DB_Services/users"));
function check_user(req) {
    return new Promise(function (resolve, reject) {
        console.log(req.headers);
        // @ts-ignore
        UsersDB.Find_User_By_Username(req.headers['username']).then(function (result) {
            // @ts-ignore
            return bcryptjs_1.default.compareSync(req.headers["password"].toString(), result.Password);
        }).then(function (result) {
            if (result) {
                console.log("User Authenticated");
                resolve(true);
            }
            else {
                console.log("User not Authenticated");
                reject(false);
            }
        });
    });
}
exports.check_user = check_user;
function Login(req) {
    return __awaiter(this, void 0, void 0, function () {
        var user, hash2, hash1, hashcompare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dotenv.config();
                    user = new User_1.User();
                    user.Username = req.body['Username'];
                    if (req.headers["password"] != null)
                        user.Password = req.headers["password"].toString();
                    return [4 /*yield*/, bcryptjs_1.default.hash("Sprints", Number(process.env.ENC_KEY) | 10)];
                case 1:
                    hash2 = _a.sent();
                    console.log(hash2);
                    return [4 /*yield*/, bcryptjs_1.default.hash(user.Password, Number(process.env.ENC_KEY) | 10)];
                case 2:
                    hash1 = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.compareSync(user.Password, hash2)];
                case 3:
                    hashcompare = _a.sent();
                    if (hashcompare) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.Login = Login;
