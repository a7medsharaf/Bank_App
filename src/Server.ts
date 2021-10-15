import {Transactions_Server} from "./Servers/Transactions_Server"
import * as dotenv from "dotenv"
dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) ;
console.log(PORT);
console.log(__dirname);
let TS= new Transactions_Server(PORT);