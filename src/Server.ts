import {Transactions_Server} from "./Servers/Transactions_Server"
import * as dotenv from "dotenv"


import * as ClientsDB from "./Services/DB_Services/Clients";
import * as CardsDB from   "./Services/DB_Services/Cards";
import * as AccountsDB from   "./Services/DB_Services/Accounts";


// @ts-ignore
//import * as dbf2 from "./Services/Generic_DB_Services/FA"
dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) ;

let TS= new Transactions_Server(PORT);

