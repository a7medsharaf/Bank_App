
import  express from "express";
import * as TC from "../Controllers/Transaction.Controller";
import * as Auth_Middleware from "../Services/Middlewares/Authentication";

export class Transactions_Router 
{
   
  
  getPath () :string{
        return "/";
    };
    
    
    getRouter() { 

        let myrouter= express.Router();

        myrouter.use(express.urlencoded());

        myrouter.use(express.json());
        myrouter.use(Auth_Middleware.Apply_Authentication)
        myrouter.post('/',TC.Validate_Transaction);
        myrouter.get('/',TC.Transactions_Home);
       
        return myrouter;

    }



};