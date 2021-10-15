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

    Connect().then((result)=>
    {
            Find_One(result).then(
              (result2)=>
              {
                
                result2.forEach(element => {
                  if(element['id']===id)
                  {
                     var myclient:Client =new Client();
                     console.log(element);
                     myclient.id=element['id'];
                     myclient.name=element['Name'];
                     myclient.address=element['Address'];
                     console.log(myclient);
                    resolve(myclient);                      
                  }
                });
                
                reject("Client not found");
              }
            )
    }
  )

   })
  
}

function Connect():Promise<MongoClient>
{
  return new Promise((resolve,reject)=>{

    dotenv.config();
    MongoClient.connect(process.env.URI as string, function(err, db) {
      if (err) reject(err);
      console.log(process.env.DBNAME as string +" "+process.env.URI as string);
    
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

