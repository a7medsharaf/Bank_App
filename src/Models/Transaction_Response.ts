export class Transaction_response {
    accepted: boolean;
    error: string;
    Payment_gateway_Balance: Number;
    constructor() {
        this.accepted = true;
        this.error = "";
        this.Payment_gateway_Balance = 0;
    }
}