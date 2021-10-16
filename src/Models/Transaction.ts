export class Transaction {
    Payment_gateway_ID:number;
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
      this.Payment_gateway_ID=0;     
    }

  

  Add_To_payment_gateway(Payment_gateway_ID:Number,Amount:Number):number
  {
     return 600;
  }

  insert()
  {
      //add transaction to the database
  }

}