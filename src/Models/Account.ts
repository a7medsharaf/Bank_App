import { Card } from "./Card";
import { Client } from "./Client";


export class Account {

  id: number;
  client: number;
  balance: number;

  constructor() {
    this.id = 0;
    this.client = 0;
    this.balance = 0;


  }

  Get_Client() {
    return this.client;
  }
  /**check if the amount you want to subtract is more than the balance  */
  check_Balance(amount: number) {
    if (amount > this.balance)
      return false
    else return true
  }
  Get_Balance() {
    return this.balance
  }
  /** /amount is send as positive or nigative value added or subtracted from the balance  */
  deduct_Balance(amount: number) {
    if (this.check_Balance(amount)) {
      this.balance = this.balance - amount
      return "balance deducted";
    }
    else return "balance canot be deducted as the amount is larger than the current balance ";
    ;
  }
  Add_Balance(amount: number) {
    this.balance = this.balance + amount
  }


}