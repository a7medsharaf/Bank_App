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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions_Router = void 0;
var express_1 = __importDefault(require("express"));
var TC = __importStar(require("../Controllers/Transaction.Controller"));
var Transactions_Router = /** @class */ (function () {
    function Transactions_Router() {
    }
    Transactions_Router.prototype.getPath = function () {
        return "/transactions";
    };
    ;
    Transactions_Router.prototype.getRouter = function () {
        var myrouter = express_1.default.Router();
        myrouter.use(express_1.default.urlencoded());
        myrouter.use(express_1.default.json());
        myrouter.post('/', TC.Validate_Transaction);
        return myrouter;
    };
    return Transactions_Router;
}());
exports.Transactions_Router = Transactions_Router;
;
