import { Account } from "../Models/Account";
import { Card } from "../Models/Card";
import { Client } from "../Models/Client";
import { Transaction } from "../Models/Transaction";
import { Transaction_response } from "../Models/Transaction_Response";
import  express, {  Request, Response}   from "express";
import { boolean } from "webidl-conversions";


export function Validate_Transaction(req:express.Request, res:express.Response)
{
    let transaction=new Transaction();
   
    transaction.card=Number(req.params['cardid']);
    transaction.ccv=req.params['ccv'];
    transaction.amount=Number(req.params['amount']);
    transaction.merchant=req.params['merchant'];
    transaction.timestamp=req.params['timestamp'];
  
    let TR=new Transaction_response();

    let card=new Card(transaction.card);

   let  ResSent:boolean=false;

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
            TR.error="Incorrect CCV";
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


     let account=new Account();
     account=card.Get_Account();
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


     let client=new Client();
     client=account.Get_Client();
     transaction.client = client.id;


     transaction.deduct();
     transaction.insert();

 
}