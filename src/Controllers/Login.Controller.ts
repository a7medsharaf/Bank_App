import  express, {  Request, Response}   from "express";
import { User } from "../Models/User";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv"
import * as UsersDB from "../Services/DB_Services/users";

export function check_user(req:Request):Promise<boolean>
{
    return new Promise<boolean>((resolve,reject)=>{
        console.log(req.headers);
        // @ts-ignore
        UsersDB.Find_User_By_Username(req.headers['username']).then((result)=>{
            
            // @ts-ignore
       return bcrypt.compareSync(req.headers["password"].toString(), result.Password)     
       

        }).then((result)=>{
             if(result)
             {
             console.log("User Authenticated");
             resolve(true);
             }
             else
             {
             console.log("User not Authenticated");
             reject(false);
             }
        })
        
      
    })
}

export async function Login(req:express.Request)
{
    dotenv.config();
    let user=new User();
    user.Username=req.body['Username'];
    if(req.headers["password"] != null)
    
    user.Password =req.headers["password"].toString() ;
    //console.log(req.headers);
    //console.log(user.Password);
    
    var hash2 = await bcrypt.hash("Sprints", Number(process.env.ENC_KEY) | 10) ;
    console.log(hash2);
    var hash1 = await bcrypt.hash(user.Password, Number(process.env.ENC_KEY) | 10) ;
    var hashcompare=await bcrypt.compareSync(user.Password, hash2)

    if (hashcompare) 
        {
            return true;
        }else
        {
            return false;
        }
    
  
    
}