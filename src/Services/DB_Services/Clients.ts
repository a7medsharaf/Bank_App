import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";

export function Find_Client_By_ID(id:number):Promise<Client>
{

  return new Promise((resolve,reject)=>{
console.log("client id  "+id)
    Connect().then((result)=>
    {
            return Find_One(result)
    }
  ).then(
    (result2)=>
    {
      console.log(result2)
     resolve(Filter_clients(result2,id));
    }
  )

   });
  
}


let Filter_clients= function(result2:Document[],id:Number):Client
{
  var myclient:Client =new Client();
  console.log(id)
  console.log(result2)
  result2.forEach(element => {
    if(element['id']===id)
    {

       
       myclient.id=element['id'];
       myclient.name=element['Name'];
       myclient.address=element['Address'];
       
      
                         
    }
  });
  return(myclient);   
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
    dbo.collection("Clients").find({}).toArray(function(err, result) {
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

