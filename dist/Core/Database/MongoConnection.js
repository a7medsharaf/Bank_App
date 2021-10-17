"use strict";
// //import { Db, MongoClient } from "mongodb";
// // const url = "mongodb://sharaf:sharaf123@cluster0.ybpqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// // export type ConnectResponse = { mongoClient: MongoClient, db: Db };
// // export const ConnectToMongo = (): Promise<ConnectResponse> => {
// //     return new Promise((resolve, reject) => {
// //         MongoClient.connect(url, function (err, mongoClient: MongoClient | undefined) {
// //             console.log("-2")
// //             if (err) return console.log(err);
// //             if (mongoClient) return resolve({ mongoClient, db: mongoClient.db("Bank") })
// //             return reject(new Error("cant connect to db"))
// //         });
// //     });
// // }
// import { MongoClient, Db, AnyError, Document } from "mongodb";
// import * as dotenv from "dotenv"
// import { connect } from "http2";
// import { Account } from "../../Models/Account";
// import { Card } from "../../Models/Card";
// import { Client } from "../../Models/Client";
// import { Transaction } from "../../Models/Transaction";
// export function ConnectToMongo(): Promise<MongoClient> {
//     return new Promise((resolve, reject) => {
//         dotenv.config();
//         MongoClient.connect(process.env.URI as string, function (err, db) {
//             if (err) reject(err);
//             console.log(process.env.DBNAME as string + " " + process.env.URI as string);
//             if (db != undefined) {
//                 resolve(db);
//             }
//         });
//     })
// }
