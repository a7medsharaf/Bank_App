
import  express from "express";
import * as TC from "../Controllers/Transaction.Controller";
import * as LC from "../Controllers/Login.Controller";

export class Transactions_Router 
{
   
  
  getPath () :string{
        return "/";
    };
    
    
    getRouter() { 

        let myrouter= express.Router();

        myrouter.use(express.urlencoded());

        myrouter.use(express.json());
        
        myrouter.post('/',TC.Validate_Transaction);
        myrouter.get('/',TC.Transactions_Home);
        myrouter.post('/Login',LC.Login);
        return myrouter;

    }



};