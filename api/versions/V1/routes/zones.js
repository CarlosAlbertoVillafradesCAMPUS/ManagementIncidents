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

//Agregar un nuevo salon
//http://127.17.0.96:5099/zones
appZones.post("/", async(req,res)=>{
    /*
    {
      "Area": "Training",
      "Classroom": "Ingles"
  
} */
    try {
        const collection = dataBase.collection("Zones")
        await collection.insertOne({
            ID:6,
            ...req.body
        })
        res.status(200).send({status:200, message:"Successfully Added"})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})





export default appZones