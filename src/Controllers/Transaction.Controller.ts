import { Account } from "../Models/Account";
import { Card } from "../Models/Card";
import { Client } from "../Models/Client";
import { Transaction } from "../Models/Transaction";
import { Transaction_response } from "../Models/Transaction_Response";
import  express, {  Request, Response}   from "express";
import { boolean } from "webidl-conversions";
import * as ClientsDB from "../Services/DB_Services/Clients";
import * as CardsDB from   "../Services/DB_Services/Cards";
import * as AccountsDB from   "../Services/DB_Services/Accounts";


export function Transactions_Home(req:express.Request, res:express.Response)
{
        res.send("Welcoem to our bank");
}

export function Validate_Transaction(req:express.Request, res:express.Response)
{
    let transaction=new Transaction();
   
    transaction.card=Number(req.body['cardid']);
    transaction.ccv=req.body['ccv'];
    transaction.amount=Number(req.body['amount']);
    transaction.merchant=req.body['merchant'];
    transaction.Payment_gateway_ID=Number(req.body['Payment_gateway_ID']);
    transaction.timestamp=req.body['timestamp'];
    let account=new Account();
    let TR=new Transaction_response();
    let  ResSent:boolean=false;
    let card=new Card(transaction.card);
    
   
    CardsDB.Find_Card_By_ID( transaction.card ).then((result)=>{card=result;
    
  

    if(card.id != transaction.card && !ResSent)
    {
            TR.accepted=false;
            TR.error="Incorrect Card Number";
            ResSent=true;
            res.send(TR);
            
    }
   
    if(card.CCV != transaction.ccv && !ResSent)
    {
            TR.accepted=false;
            TR.error="Incorrect CCV card->"+ transaction.ccv ;
            ResSent=true;
            res.send(TR);
           
    }
    
    if(card.stopped  && !ResSent)
    {
       TR.accepted=false;
       TR.error="Card Suspended";
       ResSent=true;
       res.send(TR);
       
    }

    return  AccountsDB.Find_Account_By_ID(card.Account);
}).then((result=>{


        
        account=result;
        transaction.account=account.id;
        if(account.id === 0  && !ResSent)
        {
                TR.accepted=false;
                TR.error="Card doesn't belong to the bank";
                ResSent=true;
                res.send(TR);
                
        }
   
        
        if(account.balance<transaction.amount && !ResSent)
        {
           TR.accepted=false;
           TR.error="Not enough balance";
           ResSent=true;
           res.send(TR);
           
        }
   
        return ClientsDB.Find_Client_By_ID(account.client);
})).then((result)=>{
        if(!ResSent)
        {
                TR.Client_name=result.name;
                transaction.client = result.id;
        }
})





.catch((err)=>{
        TR.accepted=false;
        TR.error=err;
        
        res.send(TR);
        

}
).finally(()=>{

       if(!ResSent)
       {
       
         AccountsDB.update_balance(account,transaction.amount*-1).then((result)=>{
         let Payment_gateway_Account=new Account();
         return AccountsDB.Find_Account_By_Paymentid(transaction.Payment_gateway_ID)
         }
         ).then((result)=>{
                return AccountsDB.update_balance(result,transaction.amount)
         }).then((result)=>{
                let newbalance:number=result.balance;
                transaction.insert();
                TR.error="No errors";
                TR.accepted=true;
                TR.Payment_gateway_Balance=newbalance;
                ResSent=true;
                res.send(TR);
         });

         
        // Payment_gateway_Account=AccountsDB.Find_Account_By_ID()
        
       }


});
}