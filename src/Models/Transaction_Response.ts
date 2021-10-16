export class Transaction_response
{
    accepted:boolean;
error:string;
Payment_gateway_Balance:Number;
Client_name:string;
    constructor()
    {
        this.accepted=true;
        this.error="";
        this.Payment_gateway_Balance=0;
        this.Client_name="";
    }
}