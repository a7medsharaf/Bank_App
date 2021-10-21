import {MongoClient,Db,AnyError,Document} from "mongodb";
import * as dotenv from "dotenv"
import { connect } from "http2";
import { Account } from "../../Models/Account";
import { Card } from "../../Models/Card";
import { Client } from "../../Models/Client";
import { Transaction } from "../../Models/Transaction";


/*
The original connection code

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


*/

export async function Find_Card_By_ID(id:string):Promise<Card>
{
    let Myconnection:MongoClient= await Connect();
    let MyDocs:Document[]=await Find_One(Myconnection);
    return Filter_cards(MyDocs,id);

}




const Connect= async ():Promise<MongoClient>=>
  { 
    return await MongoClient.connect(process.env.URI as string);
  
  }



const Find_One=async(db:MongoClient) : Promise<Document[]>=>
{
  let dbo:Db = db.db(process.env.DBNAME as string);

  return await dbo.collection("Cards").find({}).toArray();
  
}

const Filter_cards= function(result2:Document[],id:string):Card
{
  var mycard:Card =new Card("");
  result2.forEach(element => {
   
   console.log(result2)
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
