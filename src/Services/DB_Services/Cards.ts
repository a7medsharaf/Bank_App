import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";

export function Find_Card_By_ID(id:number):Promise<Card>
{

  return new Promise((resolve,reject)=>{

    Connect().then((result)=>
    {
            return Find_One(result)
    }
  ).then(
    (result2)=>
    {
 
     resolve(Filter_cards(result2,id));
    }
  )

   });
  
}


let Filter_cards= function(result2:Document[],id:Number):Card
{
  var mycard:Card =new Card(0);
  result2.forEach(element => {
    if(element['id']===id)
    {

       
       mycard.id=element['id'];
       mycard.Account=element['account'];
       mycard.CCV=element['CCV'];
       mycard.stopped=element['stopped'];
       
      
                         
    }
  });
  return(mycard);   
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
    dbo.collection("Cards").find({}).toArray(function(err, result) {
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

