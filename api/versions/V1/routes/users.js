import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

const appUser = Router();
const dataBase = await myConnect();

//Listar todos los Trainers, campers o support
//http://127.17.0.96:5099/users?rol=Admin
appUser.get("/", async(req,res)=>{
    try {
        const {rol} = req.query; 
        if(rol === "Admin"){
            res.status(400).send({status:200, message:"Data retrieval error"})
        }
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $match:{
                    Role: rol
                }
                
            },
            {
                $project: {
                  _id:0
                }
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
    } catch (error) {
        res.status(400).send({status:200, message:"Data retrieval error"})
    }
})

export default appUser