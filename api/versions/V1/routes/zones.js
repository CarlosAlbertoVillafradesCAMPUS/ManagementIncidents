import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

const appZones = Router();
const dataBase = await myConnect();

//Listar todos las zonas
//http://127.17.0.96:5099/zones/Area
appZones.get("/Area", async(req,res)=>{
    try {
        const collection = dataBase.collection("Zones")
        const data = await collection.aggregate([
            {
                $group: {
                    _id: '$Area',
                },
            },
            {
                $project: {
                  _id: 0,
                  Area: '$_id',
                },
              },
        ]).toArray()
        res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los salones
//http://127.17.0.96:5099/zones/Classroom?nameArea=Training
appZones.get("/Classroom", async(req,res)=>{
    try {
        const {nameArea} =  req.query;
        const collection = dataBase.collection("Zones")
        const data = await collection.aggregate([
            {
                $match:{
                    Area: nameArea
                }
            },
            {
                $project: {
                  _id: 0,
                },
              },
        ]).toArray()
        res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Crear un buscador para los usuarios
//http://127.17.0.96:5099/users/SearchGeneral?text=""
appZones.get("/SearchGeneral", async(req,res)=>{
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

//Crear un buscador para los usuarios
//http://127.17.0.96:5099/users/Search?rol=Camper&text=
appZones.get("/Search", async(req,res)=>{
    try {
        const {rol, text} = req.query;
        if (rol == "Admin") {
            return  res.status(400).send({status:400, message:"Data retrieval error"})
        }
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $match: {
                    Role: rol,
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


export default appZones