import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

const appUser = Router();
const dataBase = await myConnect();

appUser.get("/trainers", async(req,res)=>{
    try {
        const collection = dataBase.collection("Users")
        const data = await collection.find().toArray()
        res.send(data)
    } catch (error) {
        
    }
})

export default appUser