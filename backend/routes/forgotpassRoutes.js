const express= require("express");
const router = express.Router();
const User = require()

router.post("/resetpassword",async(req,res)=>{
    try{
        let{email,otp,newPassword}=req.body;
        if(!(email && otp && newPassword))
        throw Error("empty credentials are not allowed");

    }
    catch(error){

    }
})