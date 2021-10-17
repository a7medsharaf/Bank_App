import { ObjectId } from "mongodb";

export class Transaction {
  _id?: string
  Payment_gateway: number;
  clientID: number;
  clientID2: number;
  T_type: string;
  account: number;
  card: number;
  amount: number;
  merchant: string;
  timestamp: string;
  Cooresponding_TID: string;

  constructor(
    Payment_gateway = 0,
    clientID = 0,
    clientID2 = 0,
    T_type = "",
    account = 0,
    card = 0,
    amount = 0,
    merchant = "",
    timestamp = "",
    Cooresponding_TID = "") {
    this.clientID = clientID;
    this.T_type = T_type;
    this.account = account;
    this.card = card;
    this.amount = amount;
    this.merchant = merchant;
    this.timestamp = timestamp;
    this.Cooresponding_TID = "";
    this.Payment_gateway = Payment_gateway;
    this.clientID2 = clientID2;

  }


  // deduct(CID: number, Amount: number) {
  //   //decrease balance by amount INSERT TRANSACTION 1 AND 2 

  // }

  // Add_To_payment_gateway(clientID2: Number, Amount: Number): number {
  //   return 600;
  // }

  // insert() {
  //   //add transaction to the database
  // }

}