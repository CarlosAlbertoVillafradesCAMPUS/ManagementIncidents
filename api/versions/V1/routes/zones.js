import { Router } from "express";
import { myConnect } from "../../../db/connect.js";
import {ObjectId} from "mongodb"

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

//Listar una zona especifica
//http://127.17.0.96:5099/zones?id=1
appZones.get("/", async(req,res)=>{
    try {
        const {id} = req.query
        const collection = dataBase.collection("Zones")
        const data = await collection.aggregate([
            {
               $match:{
                ID : parseInt(id)
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

//Modificar un salon salon
//http://127.17.0.96:5099/zones?id=1
appZones.put("/", async(req,res)=>{
    /*
    {
      "Area": "Training",
      "Classroom": "Ingles"
  
} */
    try {
        const {id} = req.query
        const collection = dataBase.collection("Zones")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()

        await collection.updateOne({
            _id: new ObjectId(my_data[0]._id),
        },
        {
            $set:{
                ...req.body,
            }
        })
        res.status(200).send({status:200, message:"Successfully Modified"}) 
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Eliminar un salon
//http://127.17.0.96:5099/zones?id=1
appZones.delete("/", async(req,res)=>{
    /*
    {
      "Area": "Training",
      "Classroom": "Ingles"
  
} */
    try {
        const {id} = req.query
        const collection = dataBase.collection("Zones")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()

        await collection.deleteOne({
            _id: new ObjectId(my_data[0]._id),
        },)
        res.status(200).send({status:200, message:"Successfully Deleted"}) 
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})





export default appZones