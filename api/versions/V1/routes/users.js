import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

const appUser = Router();
const dataBase = await myConnect();

//Listar todos los Trainers, campers o support
//http://127.17.0.96:5099/users?rol=Admin
appUser.get("/", async(req,res)=>{
    try {
        if (req.query.rol) {
            const {rol} = req.query; 
            if(rol === "Admin"){
               return res.status(400).send({status:200, message:"Data retrieval error"})
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
                      _id:0,
                      Password:0
                    }
                }
            ]).toArray()
            return res.status(200).send({status:200, data:data})
        }
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $project: {
                  _id:0,
                  Password:0
                }
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Crear un buscador para los usuarios
//http://127.17.0.96:5099/users/SearchGeneral?text=""
appUser.get("/SearchGeneral", async(req,res)=>{
    try {
        const {text} = req.query;
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $match: {
                    Role: {
                        $not: {
                            $eq: "Admin",
                          },
                      },
                Nickname: {
                    $regex: new RegExp('^' +text, 'i'),
                  },
                },
            },
            {
                $project: {
                  _id:0,
                  Password:0
                }
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

export default appUser