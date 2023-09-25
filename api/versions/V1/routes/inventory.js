import { Router } from "express";
import { myConnect } from "../../../db/connect.js";
import {ObjectId} from "mongodb"
import { verifyToken } from "../../../config/jwt.js";

const appInventory = Router();
const dataBase = await myConnect();

appInventory.use(verifyToken())
//Obtener el inventario de una zona especifica
//http://127.17.0.96:5099/inventory?zoneId=1
appInventory.get("/", async(req,res)=>{
    try {
        const {zoneId} = req.query
        const collection = dataBase.collection("Zones")
        const data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(zoneId)
                }
                
            },
            {
                $lookup: {
                  from: "Inventory",
                  localField: "ID",
                  foreignField: "Zone_id",
                  as: "Inventory_Info"
                }
            },
            {
                $project: {
                  _id: 0,
                  "Inventory_Info._id":0
                },
              },
        ]).toArray()
        res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar una zona especifica
//http://127.17.0.96:5099/inventory
appInventory.post("/", async(req,res)=>{
    /*
     {
          "Zone_id": 3,
          "Object": {
            "Name_Object": "Computer",
            "Parts": {
              "Mouse": 6,
              "Keyboard": 7,
              "Monitor": 8
            }
          }
        } */
    try {
        const collection = dataBase.collection("Inventory")
        const {Zone_id, Object} = req.body
        await collection.insertOne({
            ID:9,
            Zone_id: Zone_id,
            Object:{
                ID:8,
                ...Object
            }
        })
        res.status(200).send({status:200, data:"Successfully Added"})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Modificar un inventario
//http://127.17.0.96:5099/inventory?id=1
appInventory.put("/", async(req,res)=>{
    /*
    {
      "Area": "Training",
      "Classroom": "Ingles"
  
} */
    try {
        const {id} = req.query
        const collection = dataBase.collection("Inventory")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()
        console.log(req.body);
        await collection.updateOne({
            _id: new ObjectId(my_data[0]._id),
        },
        {
            $set:{
                ...req.body,
            }
        })
        res.status(200).send({status:200, message:"Successfully Added"}) 
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Eliminar un inventario
//http://127.17.0.96:5099/inventory?id=1
appInventory.delete("/", async(req,res)=>{
    /*
    {
      "Area": "Training",
      "Classroom": "Ingles"
  
} */
    try {
        const {id} = req.query
        const collection = dataBase.collection("Inventory")
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





export default appInventory