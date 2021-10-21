import { Double } from "bson";
import { Account } from "./Account";
import { Client } from "./Client";
import { Transaction } from "./Transaction";
import { Transaction_response } from "./Transaction_Response";


export class Card {

id:string;
Account:number;
CCV:string;
stopped:boolean;

    constructor(id:string) {

      this.id = id;
      this.Account = 0;
      this.CCV="";
      this.stopped=false;
      
    }

    Validate_Against_Transaction(T:Transaction):Transaction_response
    {
      let TR=new Transaction_response();
      TR.accepted=true;
      TR.error="No Errors"
      console.log(T);
      console.log(this);
      if(this.id != T.card )
      {
              TR.accepted=false;
              TR.error="Incorrect Card Number";
              return TR;
             
              
      }
     
      if(this.CCV != T.ccv)
      {
              TR.accepted=false;
              TR.error="Incorrect CCV card->"+ T.ccv ;
              return TR;
            
             
      }
      
      if(this.stopped)
      {
         TR.accepted=false;
         TR.error="Card Suspended";
         return TR;
        
      }
      return TR;
    }
  
    
}