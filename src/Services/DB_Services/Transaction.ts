import { MongoClient, ObjectId, Db, AnyError, Document } from "mongodb";
import * as dotenv from "dotenv"
import { Transaction } from "../../Models/Transaction";

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
    cardID: number,
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