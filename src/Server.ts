import {Transactions_Server} from "./Servers/Transactions_Server"
import * as dotenv from "dotenv"
dotenv.config({path: __dirname+"//Bank.env"});
const PORT = parseInt(process.env.PORT as string, 10) || 8888;
console.log(PORT);
console.log(__dirname);
let TS= new Transactions_Server(PORT);