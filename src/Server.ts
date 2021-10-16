import {Transactions_Server} from "./Servers/Transactions_Server"
import * as dotenv from "dotenv"
dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) ;
let TS= new Transactions_Server(PORT);

