import { Account } from "../Models/Account";
import { Card } from "../Models/Card";
import { Client } from "../Models/Client";
import { Transaction } from "../Models/Transaction";
import { Transaction_response } from "../Models/Transaction_Response";
import express, { Request, Response } from "express";
import { boolean } from "webidl-conversions";
import * as ClientsDB from "../Services/DB_Services/Clients";
import * as CardsDB from "../Services/DB_Services/Cards";
import * as AccountsDB from "../Services/DB_Services/Accounts";
import * as transaction from "../Services/DB_Services/Transaction";
import { Console } from "console";
import { ObjectId } from "bson";

export function Transactions_Home(req: express.Request, res: express.Response) {
        res.send("Welcoem to our bank");
}

async function deduct(
        Payment_gateway: number,
        clientID: number,
        clientID2: number,
        T_type: string,
        accountID: number,
        cardID: number,
        amount: number,
        merchant: string,
        timestamp: string,
        Cooresponding_TID: string, account: Account) {
        // INSERT TRANSACTION 1 AND 2 

        clientID = account.client
        let transactionForClientid = await transaction.insert_One({ Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID })

        T_type = "C"
        Payment_gateway = 0
        let temp = clientID
        clientID = clientID2
        clientID2 = temp
        Cooresponding_TID = transactionForClientid.toString()

        let transactionForGatewayid = await transaction.insert_One({ Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID })

        transaction.updateone(transactionForClientid, transactionForGatewayid.toString())

}
export function CreateTransaction(req: express.Request, res: express.Response) {
        //let transaction = new Transaction();
        let Payment_gateway: number = Number(req.body['Payment_gateway_ID']);
        let clientID: number
        let clientID2: number = 13
        let T_type: string = "D"
        let accountID: number
        let cardID: number = Number(req.body['cardid']);
        let amount: number = Number(req.body['amount']);
        let merchant: string = req.body['merchant'];
        let timestamp: string = req.body['timestamp'];
        let ccv = req.body['ccv']
        let Cooresponding_TID: string
        let account: Account

        let TR = new Transaction_response();
        let card = new Card(cardID);

        CardsDB.Find_Card_By_ID(cardID).then((result) => {
                card = result;
                console.log(card);

                let ResSent: boolean = false;

                if (card.id != cardID) {
                        TR.accepted = false;
                        TR.error = "Incorrect Card Number";
                        ResSent = true;
                        throw new Error("Incorrect Card Number")

                }
                if (card.CCV != ccv) {
                        TR.accepted = false;
                        console.log("ccv")
                        TR.error = "Incorrect CCV card->" + card.CCV;
                        ResSent = true;
                        throw new Error("Incorrect CCV card->" + card.CCV)

                }

                if (card.stopped) {
                        TR.accepted = false;
                        TR.error = "Card Suspended";
                        ResSent = true;
                        throw new Error("Card Suspended")

                }


                AccountsDB.Find_Account_By_ID(card.Get_Account()).then((result) => {
                        console.log(result.balance.toString())
                        account = result;
                        accountID = account.id;

                        if (account.id === 0) {
                                TR.accepted = false;
                                TR.error = "Card doesn't belong to the bank";
                                ResSent = true;
                                throw new Error("Card doesn't belong to the bank")

                        }


                        else if (account.balance < amount) {
                                TR.accepted = false;
                                TR.error = "Not enough balance";
                                ResSent = true;
                                throw new Error("Not enough balance")

                        }


                        console.log(Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID, account)
                        deduct(Payment_gateway, clientID, clientID2, T_type, accountID, cardID, amount, merchant, timestamp, Cooresponding_TID, account);
                        // UPDATE BALANCE HERE
                        TR.error = "No errors";
                        TR.accepted = true;
                        TR.Payment_gateway_Balance = 0;
                        ResSent = true;
                        res.send(TR);
                        console.log(ResSent);

                }).catch((e: any) => {
                        console.log(e)
                        return res.status(404).send(e.message);
                })


        }).catch((err: any) => {
                console.log(err)
                return res.status(404).send(err);


        }
        ).finally(() => {




        });
}