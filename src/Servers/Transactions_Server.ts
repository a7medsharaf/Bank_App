import  express from "express";
import {Transactions_Router} from "../Routers/Transactions_Router";

export class Transactions_Server
{

    constructor(port:Number) {
        const app = express();
        let TR=new Transactions_Router();
        app.use(TR.getPath(), TR.getRouter());
        
        
        
        app.listen(port);   
        }
        

}