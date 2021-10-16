import { Account } from "./Account";
import { Client } from "./Client";



export class Card {

  id: number;
  Account: number;
  CCV: string;
  stopped: boolean;

  constructor(id: number) {

    this.id = id;
    this.Account = 0;
    this.CCV = "";
    this.stopped = false;

  }

  Get_Account() {

    return this.Account;
  }



}