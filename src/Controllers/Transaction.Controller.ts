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
   // console.log(req.body);
    transaction.card=Number(req.body['cardid']);
    transaction.ccv=req.body['ccv'];
    transaction.amount=Number(req.body['amount']);
    transaction.merchant=req.body['merchant'];
    transaction.Payment_gateway_ID=Number(req.body['Payment_gateway_ID']);
    transaction.timestamp=req.body['timestamp'];
  
    let TR=new Transaction_response();

    let card=new Card(transaction.card);
    //let card=CardsDB.Find_Card_By_ID(transaction.card);
    console.log( transaction.card +" "+ typeof( transaction.card));
    CardsDB.Find_Card_By_ID( transaction.card ).then((result)=>{card=result;
    console.log(card);

   let  ResSent:boolean=false;

    if(card.id != transaction.card && !ResSent)
    {
            TR.accepted=false;
            TR.error="Incorrect Card Number";
            ResSent=true;
            res.send(TR);
            
    }
    console.log(card);

    if(card.CCV != transaction.ccv && !ResSent)
    {
            TR.accepted=false;
            TR.error="Incorrect CCV card->"+ card.CCV ;
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

  if(!ResSent)
  {
     let account=new Account();

     
     account=card.Get_Account();
     AccountsDB.Find_Account_By_ID(card.Account).then((result)=>{
             console.log(result.balance.toString())
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


     let client=new Client();
     client=account.Get_Client();
     transaction.client = client.id;

     transaction.deduct(client.id,transaction.amount);
    let newbalance:number= transaction.Add_To_payment_gateway(transaction.Payment_gateway_ID,transaction.amount);
     transaction.insert();
     TR.error="No errors";
     TR.accepted=true;
     TR.Payment_gateway_Balance=newbalance;
     ResSent=true;
     res.send(TR);
     console.log(ResSent);
        });

    }    

}).catch((err)=>{console.log(err);
        TR.accepted=false;
        TR.error="Incorrect Card Number";
        
        res.send(TR);
        

}
).finally(()=>{

       


});
}