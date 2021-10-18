import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { User } from "../../Models/User";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";


export function Find_User_By_Username(Username:string):Promise<User>
{

  return new Promise((resolve,reject)=>{

    Connect().then((result)=>
    {
            return Find_One(result)
    }
  ).then(
    (result2)=>
    {
     
     resolve(Filter_Users(result2,Username));
    }
  )

   });
  
}


let Filter_Users= function(result2:Document[],Username:string):User
{
  var myuser:User =new User();
  result2.forEach(element => {
    if(element['Username']===Username)
    {

       
      myuser.Username=element['Username'];
      myuser.Password=element['Password'];
     
       
      
                         
    }
  });
  return(myuser);   
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
    dbo.collection("Users").find({}).toArray(function(err, result) {
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

