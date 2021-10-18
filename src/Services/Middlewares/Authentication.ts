import  express, {  Request, Response}   from "express";
import { User } from "../../Models/User";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv"
import * as UsersDB from "../../Services/DB_Services/users";

export function Apply_Authentication(req:Request,res:Response,next:express.NextFunction)
{
   
        // @ts-ignore
        UsersDB.Find_User_By_Username(req.headers['username']).then((result)=>{
            
            // @ts-ignore
       return bcrypt.compareSync(req.headers["password"].toString(), result.Password)     
       

        }).then((result)=>{
             if(result)
             {
             console.log("User Authenticated from middleware");
              next();
             }
             else
             {
             console.log("User not Authenticated");
             res.send("Authentication failed in middleware");
             }
        })
        
    }