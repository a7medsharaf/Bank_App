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
import * as TransactionDB from   "../Services/DB_Services/Transaction";
import { ObjectId } from "bson";
import {check_user} from "./Login.Controller";

export function Transactions_Home(req:express.Request, res:express.Response)
{
        res.send("Welcoem to our bank");
}

export async function Validate_Transaction(req:express.Request, res:express.Response)
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
    let client=new Client();
    let payment_account=new Account();
    var TID_Debit:ObjectId;
    var newbalance:number=0;
    let operation_date_time=new Date().toUTCString();

     
    try
    {
        let user_auth=await check_user(req);
     if(!user_auth)
     {
        TR.accepted=false;
        TR.error="Incorrect password";
        ResSent=true;
        res.send(TR);
     }
     else
     {
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
                client=result;
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
         
         return AccountsDB.Find_Account_By_Paymentid(transaction.Payment_gateway_ID)
         }
         ).then((result)=>{
                payment_account=result;
                return AccountsDB.update_balance(result,transaction.amount)
         }).then((result)=>{
                newbalance=result.balance;
               
              
                let Debit_Transaction=
                {
                        Payment_gateway: transaction.Payment_gateway_ID,
                        clientID: client.id,
                        clientID2: payment_account.client,
                        T_type: 'D',
                        accountID: account.id,
                        cardID: transaction.card,
                        amount: transaction.amount,
                        merchant: transaction.merchant,
                        timestamp: operation_date_time,
                        Cooresponding_TID: ''     
                }

                return TransactionDB.insert_One(Debit_Transaction)
         }).then((result_objectid)=>{
                TID_Debit=result_objectid ;
                let Credit_Transaction=
                {
                        Payment_gateway: transaction.Payment_gateway_ID,
                        clientID: payment_account.client,
                        clientID2: client.id,
                        T_type: 'C',
                        accountID: payment_account.id,
                        cardID: transaction.card,
                        amount: transaction.amount,
                        merchant: transaction.merchant,
                        timestamp: operation_date_time,
                        Cooresponding_TID: TID_Debit.toString()  
                }

                return TransactionDB.insert_One(Credit_Transaction)
         }).then((result)=>{

                TransactionDB.updateone(TID_Debit,result.toString());
                 TR.error="No errors";
                 TR.accepted=true;
                 TR.Payment_gateway_Balance=newbalance;
                 ResSent=true;
                 res.send(TR);

         })
         {

         };

         
       
        
       }


});
     }
    }
    catch(err){
            console.log(err);    
            TR.accepted=false;
            TR.error="Authenticaion error";
            ResSent=true;
            res.send(TR);       
    }
}