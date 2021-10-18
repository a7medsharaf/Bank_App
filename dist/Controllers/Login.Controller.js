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
exports.check_user = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
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
