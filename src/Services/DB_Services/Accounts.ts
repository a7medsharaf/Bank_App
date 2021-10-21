import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";
import { json } from "stream/consumers";

export function Find_Account_By_ID(id:number):Promise<Account>
{

  return new Promise((resolve,reject)=>{

    Connect().then((result)=>
    {
            return Find_One(result)
    }
  ).then(
    (result2)=>
    {
 
     resolve(Filter_Accouns(result2,id));
    }
  )

   });
  
}


export function Find_Account_By_Paymentid(id:number):Promise<Account>
{

  return new Promise((resolve,reject)=>{

    Connect().then((result)=>
    {
            return Find_One(result)
    }
  ).then(
    (result2)=>
    {
 
     resolve(Filter_Accouns_by_Paymentid(result2,id));
    }
  )

   });
  
}


export function update_balance(acc:Account,Added_Val:number)
{
  return new Promise<Account>((resolve,reject)=>{

    Connect().then((result)=>
    {
            return update_one(result,acc,Added_Val)
    }
  ).then(
    (result2)=>
    {
 
     resolve(result2);
    }
  )

   });
  
}


let Filter_Accouns= function(result2:Document[],id:Number):Account
{
  var myAccount:Account =new Account();
  result2.forEach(element => {
    if(element['id']===id)
    {

      myAccount.id=element['id'];
      myAccount.balance=element['Balance'];
      myAccount.client=element['client'];
       
      
                         
    }
  });
  return(myAccount);   
}

let Filter_Accouns_by_Paymentid= function(result2:Document[],id:Number):Account
{
  var myAccount:Account =new Account();
  result2.forEach(element => {
    if(element['Payment_Gateway_ID']===id)
    {

      myAccount.id=element['id'];
      myAccount.balance=element['Balance'];
      myAccount.client=element['client'];
      myAccount.Payment_Gateway_ID=element['Payment_Gateway_ID'];
      
                         
    }
  });
  return(myAccount);   
}

const Connect=async ():Promise<MongoClient> =>
{
  return await MongoClient.connect(process.env.URI as string);
}

const Find_One=async (db:MongoClient): Promise<Document[]>=>
{
  let dbo:Db = db.db(process.env.DBNAME as string);
  return await dbo.collection("Accounts").find({}).toArray();
}
/*
const update_onee=async(db:MongoClient,acc:Account,Added_Val:number):Promise<Account>=>
{
  let dbo:Db = db.db(process.env.DBNAME as string);
  let account_new:Account =new Account();
  account_new=acc;
  account_new.balance=Number(acc.balance) + Number(Added_Val);
  return await dbo.collection("Accounts").updateOne({id:acc.id},{$set:{Balance:acc.balance} });

}
*/
function update_one(db:MongoClient,acc:Account,Added_Val:number)
{
  return new Promise<Account>((resolve,reject)=>{
    
    let dbo:Db = db.db(process.env.DBNAME as string);

     let account_new =new Account();
     account_new=acc;
     account_new.balance=Number(acc.balance) + Number(Added_Val);


    let account
    dbo.collection("Accounts").updateOne({id:acc.id},{$set:{Balance:acc.balance} }, function(err, res) {
      if (err) reject(err);
      else {console.log(account_new);resolve(account_new)}
      db.close();
    });


  })
}