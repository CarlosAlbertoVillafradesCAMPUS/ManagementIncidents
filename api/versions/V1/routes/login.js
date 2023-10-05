import { Router } from "express";
import { generateToken ,verifyToken } from "../../../config/jwt.js"; 

const appLogin = Router();

appLogin.all("/", generateToken, async (req,res)=>{
    res.status(req.data.status).send(req.data);
})
appLogin.get("/token", verifyToken(), (req,res)=>{
    try {
        res.status(200).send({status:200, data:req.data})
    } catch (error) {
        res.status(400).send({status:400, data:"error"})  
    }
})

export default appLogin;