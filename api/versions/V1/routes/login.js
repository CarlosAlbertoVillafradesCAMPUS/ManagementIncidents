import { Router } from "express";
import { generateToken } from "../../../config/jwt.js"; 

const appLogin = Router();

appLogin.all("/", generateToken, async (req,res)=>{
    res.status(req.data.status).send(req.data);
})

export default appLogin;