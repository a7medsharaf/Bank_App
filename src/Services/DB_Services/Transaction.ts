import { MongoClient, ObjectId, Db, AnyError, Document } from "mongodb";
import * as dotenv from "dotenv"
import { Transaction } from "../../Models/Transaction";
import { domainToASCII } from "url";

function Connect(): Promise<MongoClient> {
    return new Promise((resolve, reject) => {

        dotenv.config();
        MongoClient.connect(process.env.URI as string, function (err, db) {
            if (err) reject(err);
            console.log(process.env.DBNAME as string + " " + process.env.URI as string);

            if (db != undefined) {
                resolve(db);
            }
        });


    })
}

export function insert_One(data: {
    Payment_gateway: number,
    clientID: number,
    clientID2: number,
    T_type: string,
    accountID: number,
    cardID: string,
    amount: number,
    merchant: string,
    timestamp: string,
    Cooresponding_TID: string
}): Promise<ObjectId> {
    return new Promise((resolve, reject) => {
        let _id = new ObjectId
        Connect().then((db) => {

            let dbo: Db = db.db(process.env.DBNAME as string);
            return dbo.collection('Transactions').insertOne({
                Payment_gateway: data.Payment_gateway,
                clientID: data.clientID, clientID2: data.clientID2, T_type: data.T_type, accountID: data.accountID,
                cardID: data.cardID, amount: data.amount, merchant: data.merchant,
                timestamp: data.timestamp, Cooresponding_TID: data.Cooresponding_TID
            }, function (err, res) {
                if (err) return reject(err);
                if (res) return resolve(res.insertedId)
                db.close();
            })

        })
    })
}
export function updateone(id: ObjectId, Cooresponding: string) {
    // let _id = new ObjectId(id)
    Connect().then((db) => {

        let dbo: Db = db.db(process.env.DBNAME as string);
        dbo.collection('Transactions').updateOne({ _id: id }, { $set: { Cooresponding_TID: Cooresponding } })

    })
}

function Get_All(db:MongoClient) : Promise<Document[]>
{
  return new Promise((resolve,reject)=>{

    let dbo:Db = db.db(process.env.DBNAME as string);
    dbo.collection("Transactions").find({}).toArray(function(err, result) {
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

export function Get_All_Transactions():Promise<Document[]>
{
   return new Promise<Document[]>((resolve,reject)=>{


    Connect().then((res)=>{
        return Get_All(res);
    }).then((res)=>resolve(res))

   })
}

export async function Filter_Transactions(Portalid:Number):Promise<Transaction[]>
{
   var Docs:Document[];
   var Result:Transaction[];
   var temp:Transaction;
   Docs=new Array(0);
   Result=new Array(0);
   
   return new Promise<Transaction[]>((resolve,reject)=>{
       
    Get_All_Transactions().then((result)=>{
        for(var i=0;i<result.length;i++)
        {
                 if(result[i]['Payment_gateway']===Portalid)
                 {
                   temp=new Transaction();
                   temp.Payment_gateway_ID=result[i]['accPayment_gatewayountID'];
                   temp.account=result[i]['accountID'];
                   temp.client=result[i]['clientID2'];
                   temp.amount=result[i]['amount'];
                   temp.card=result[i]['cardID'];
                   temp.merchant=result[i]['merchant'];
                   temp.timestamp=result[i]['timestamp'];
                   
                   Result.push(temp);
    
                 }
        }
    
        
         
       }).finally(()=>{resolve(Result)})
       





   })


  
    

}