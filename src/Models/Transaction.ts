export class Transaction {

    client:number;
    account:number;
    card:number;
    amount:number;
    merchant:string;
    timestamp:string;
    ccv:string;

    constructor() {
      this.client = 0;
      this.account=0;
      this.card=0;
      this.amount=0;
      this.merchant="";
      this.timestamp="";
      this.ccv="";      
    }

  deduct()
  {
      //decrease balance by amount
  }

  insert()
  {
      //add transaction to the database
  }

}