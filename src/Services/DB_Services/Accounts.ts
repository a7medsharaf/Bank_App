import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";

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

function Connect():Promise<MongoClient>
{
  return new Promise((resolve,reject)=>{

    dotenv.config();
    MongoClient.connect(process.env.URI as string, function(err, db) {
      if (err) reject(err);
     
    
      if(db!=undefined)
      {
        resolve(db);
      }
    });
    

  })
}


function Find_One(db:MongoClient) : Promise<Document[]>
{
  return new Promise((resolve,reject)=>{

    let dbo:Db = db.db(process.env.DBNAME as string);
    dbo.collection("Accounts").find({}).toArray(function(err, result) {
      if (err) reject(err);

      if(result!=undefined)
      {
        resolve(result);
      }
     // @ts-ignore
      db.close();
    });
  
  
  })
}
