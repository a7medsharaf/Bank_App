import {Transactions_Server} from "./Servers/Transactions_Server"
import * as dotenv from "dotenv"


import * as ClientsDB from "./Services/DB_Services/Clients";
import * as CardsDB from   "./Services/DB_Services/Cards";
import * as AccountsDB from   "./Services/DB_Services/Accounts";


// @ts-ignore
//import * as dbf2 from "./Services/Generic_DB_Services/FA"
dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) ;
console.log(PORT);
console.log(__dirname);
let TS= new Transactions_Server(PORT);

//ClientsDB.Find_Client_By_ID(11).then((result)=>{console.log(result.name)}).catch((err)=>{console.log(err)});
//CardsDB.Find_Card_By_ID(31).then((result)=>{console.log(result.Account)}).catch((err)=>{console.log(err)});
//AccountsDB.Find_Account_By_ID(21).then((result)=>{console.log(result.balance.toString())}).catch((err)=>{console.log(err)});