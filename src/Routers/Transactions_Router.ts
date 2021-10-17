
import express from "express";
import * as TC from "../Controllers/Transaction.Controller";

export class Transactions_Router {


    getPath(): string {
        return "/";
    };


    getRouter() {

        let myrouter = express.Router();

        myrouter.use(express.urlencoded());

        myrouter.use(express.json());

        myrouter.post('/', TC.CreateTransaction);
        myrouter.get('/', TC.Transactions_Home);
        return myrouter;

    }



};