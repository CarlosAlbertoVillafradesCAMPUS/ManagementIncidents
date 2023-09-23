import { Router } from "express";
import { myConnect } from "../../../db/connect.js";
import {ObjectId} from "mongodb"

const appReportIncidents = Router();
const dataBase = await myConnect();


//Listar todos los incidentes Ordenados del mas reciente al mas antiguo dependiendo el status
//http://127.17.0.96:5099/incidents/ordenados?status=Pending
appReportIncidents.get("/Ordenados", async(req,res)=>{
    try {
        if ( req.query.nit) {
            const {status, nit} = req.query;
            const collection = dataBase.collection("Users")
            const data = await collection.aggregate([
                {
                    $lookup: {
                      from: "Report_Incidents",
                      localField: "Nit",
                      foreignField: "By_Camper.Nit",
                      as: "Incidents_Report"
                    }
                },
                {
                    $match:{
                        Nit: parseInt(nit),
                        "Incidents_Report.Status": status
                    }
                },
                {
                    $project: {
                        _id:0,
                        Password:0,
                        "Incidents_Report._id":0,
                        "Incidents_Report.By_Camper": 0
                    }
                   
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
        }else{
            const collection = dataBase.collection("Report_Incidents")
            const {status} = req.query
            const data = await collection.aggregate([
                {
                    $match: {
                      Status: status
                    }
                },
                {
                    $sort: {
                      "Date_Report": -1
                    }
                },
                {
                    $lookup: {
                      from: "Inventory",
                      localField: "Inventory_id",
                      foreignField: "ID",
                      as: "Inventory_Info"
                    }
                },
                {
                    $lookup: {
                      from: "Zones",
                      localField: "Zone_id",
                      foreignField: "ID",
                      as: "Zone_Info"
                    }
                },
                {
                    $unwind: "$Zone_Info"
                },
                {
                    $project: {
                      _id:0,
                      Inventory_id:0,
                      Zone_id:0,
                      "Inventory_Info._id":0,
                      "Inventory_Info.Zone_id":0,
                      "Zone_Info._id":0,
                    }
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
        }
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})



//Listar todos los incidentes reportados por un campista específico
//http://127.17.0.96:5099/incidents?nit=111111111
appReportIncidents.get("/", async(req,res)=>{
    try {
        if (req.query.nit) {
            const {nit} = req.query; 
            const collection = dataBase.collection("Users")
            const data = await collection.aggregate([
                {
                    $lookup: {
                      from: "Report_Incidents",
                      localField: "Nit",
                      foreignField: "By_Camper.Nit",
                      as: "Incidents_Report"
                    }
                },
                {
                    $match:{
                        Nit: parseInt(nit)
                    }
                },
                {
                    $project: {
                        _id:0,
                        Password:0,
                        "Incidents_Report._id":0,
                        "Incidents_Report.By_Camper": 0
                    }
                   
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
        }else{
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.find({}).toArray()
            res.status(200).send({status:200, data:data})
        }
      
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes materiales reportados por un campista
//http://127.17.0.96:5099/incidents/Material?nit=1006654874
appReportIncidents.get("/Material", async(req,res)=>{
    try {
        if (req.query.nit) {
            const {nit} = req.query; 
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $lookup: {
                  from: "Report_Incidents",
                  localField: "Nit",
                  foreignField: "By_Camper.Nit",
                  as: "Incidents_Report"
                }
            },
            {
                $match:{
                    Nit:parseInt(nit),
                    "Incidents_Report.Incident_Type": "Material"
                }
            },
            {
                $project: {
                    _id:0,
                    Password:0,
                    "Incidents_Report._id":0
                }
               
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
        }else{
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.aggregate([
                {
                    $match:{
                        "Incident_Type": "Material"
                    }
                },
                {
                    $lookup: {
                      from: "Inventory",
                      localField: "Inventory_id",
                      foreignField: "ID",
                      as: "Inventory_Info"
                    }
                },
                {
                    $lookup: {
                      from: "Zones",
                      localField: "Zone_id",
                      foreignField: "ID",
                      as: "Zone_Info"
                    }
                },
                {
                    $unwind: "$Zone_Info"
                },
                {
                    $project: {
                        _id:0,
                        Inventory_id:0,
                        Zone_id:0,
                        "Inventory_Info._id":0,
                        "Inventory_Info.Zone_id":0,
                        "Zone_Info._id":0,
                    }
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
        }
        
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes Digitales reportados por un campista
//http://127.17.0.96:5099/incidents/Digital?nit=1006654874
appReportIncidents.get("/Digital", async(req,res)=>{
    try {
        if (req.query.nit) {
            const {nit} = req.query; 
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $lookup: {
                  from: "Report_Incidents",
                  localField: "Nit",
                  foreignField: "By_Camper.Nit",
                  as: "Incidents_Report"
                }
            },
            {
                $match:{
                    Nit:parseInt(nit),
                    "Incidents_Report.Incident_Type": "Digital"
                }
            },
            {
                $project: {
                    _id:0,
                    Password:0,
                    "Incidents_Report._id":0
                }
               
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
        }else{
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.aggregate([
                {
                    $match:{
                        "Incident_Type": "Digital"
                    }
                },
                {
                    $lookup: {
                      from: "Inventory",
                      localField: "Inventory_id",
                      foreignField: "ID",
                      as: "Inventory_Info"
                    }
                },
                {
                    $lookup: {
                      from: "Zones",
                      localField: "Zone_id",
                      foreignField: "ID",
                      as: "Zone_Info"
                    }
                },
                {
                    $unwind: "$Zone_Info"
                },
                {
                    $project: {
                        _id:0,
                        Inventory_id:0,
                        Zone_id:0,
                        "Inventory_Info._id":0,
                        "Inventory_Info.Zone_id":0,
                        "Zone_Info._id":0,
                    }
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
        }
        
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes reportados en el área de revisión
//http://127.17.0.96:5099/incidents/Area?nameArea=Training
appReportIncidents.get("/Area", async(req,res)=>{
    try {
        const {nameArea} = req.query; 
        const collection = dataBase.collection("Report_Incidents")
        const data = await collection.aggregate([
            {
                $sort: {
                  "Date_Report": -1
                }
            },
            {
                $lookup: {
                  from: "Inventory",
                  localField: "Inventory_id",
                  foreignField: "ID",
                  as: "Inventory_Info"
                }
            },
            {
                $lookup: {
                  from: "Zones",
                  localField: "Zone_id",
                  foreignField: "ID",
                  as: "Zone_Info"
                }
            },
            {
                $unwind: "$Zone_Info"
            },
            {
                $match: {
                  "Zone_Info.Area": nameArea
                }
            },
            {
                $project: {
                    _id:0,
                    Inventory_id:0,
                    Zone_id:0,
                    "Inventory_Info._id":0,
                    "Inventory_Info.Zone_id":0,
                    "Zone_Info._id":0,
                }
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes reportados en el área de revisión
//http://127.17.0.96:5099/incidents/Classroom?nameClassroom=Sputnik
appReportIncidents.get("/Classroom", async(req,res)=>{
    try {
        const {nameClassroom} = req.query; 
        const collection = dataBase.collection("Zones")
        const data = await collection.aggregate([
            {
                $lookup: {
                  from: "Report_Incidents",
                  localField: "ID",
                  foreignField: "Zone_id",
                  as: "Incidents_Info"
                }
            },
            {
                $sort: {
                  "Incidents_Info.Date_Report": -1
                }
            },
            {
                $match: {
                  "Classroom": nameClassroom
                }
            },
            {
                $project: {
                    _id:0,
                    "Incidents_Info._id":0,
                    "Incidents_Info.Zone_id":0,

                }
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//post Reportar incidentes
//http://127.17.0.96:5099/incidents/
appReportIncidents.post("/", async(req,res)=>{
    /*
{
    "Incident_Type": "Material",
    "Inventory_id": 1,
    "Zone_id": 3,
    "Description": "The mouse is not working",
    "By_Camper": {
      "Nit": 1004344958,
      "Full_Name": "John Doe"
    }
}
    */
    try {
        const collection = dataBase.collection("Report_Incidents")
        const today = new Date();
        const date_report = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        await collection.insertOne({
            ID:44,
            ...req.body,
            Status: "Pending",
            Date_Report: date_report,
        })
        res.status(200).send({status:200, message:"Successfully added"})
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//PUT Modificar incidentes
//http://127.17.0.96:5099/incidents:id
appReportIncidents.put("/:id", async(req,res)=>{
    /*
{
    "Incident_Type": "Material",
    "Inventory_id": 1,
    "Zone_id": 3,
    "Description": "The mouse is not working",
    "By_Camper": {
      "Nit": 1004344958,
      "Full_Name": "John Doe"
    }
}
    */
    try {
        const {id} = req.params;
        const collection = dataBase.collection("Report_Incidents")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()
        if(my_data[0].Status !== "Pending"){
            return res.status(400).send({status:400, message:`The incident cannot be modified because it is in the '${my_data[0].Status}' state.`})
        }
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
        res.status(400).send({status:400, message:"Failed to Modify"})
    }
})


//PUT Modificar incidentes ASSIGNADOS
//http://127.17.0.96:5099/incidents/Assign/:id
appReportIncidents.put("/Assign/:id", async(req,res)=>{
    /*
{
    "Incident_Type": "Material",
    "Inventory_id": 1,
    "Zone_id": 3,
    "Description": "The mouse is not working",
    "By_Camper": {
      "Nit": 1004344958,
      "Full_Name": "John Doe"
    }
}
    */
    try {
        const {id} = req.params;
        const collection = dataBase.collection("Report_Incidents")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()
        const {Severity, By_Trainer, Support_Person} = req.body
        if(my_data[0].Status == "Assigned"){
            my_data[0].Severity = Severity,
            my_data[0].By_Trainer = By_Trainer,
            my_data[0].Support_Person = Support_Person,
            await collection.updateOne({
                _id: new ObjectId(my_data[0]._id),
            },
            {
                $set:{
                    ...my_data[0],
                }
            })
            return res.status(200).send({status:200, message:"Successfully Modified"})
        }
            const today = new Date();
            const date_assigned = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            my_data[0].Status = "Assigned"
            await collection.updateOne({
                _id: new ObjectId(my_data[0]._id),
            },
            {
                $set:{
                    ...my_data[0],
                    ...req.body,
                    Date_Assigned: date_assigned
                }
            })
                
            res.status(200).send({status:200, message:"Successfully Modified"})
         
    } catch (error) {
        res.status(400).send({status:400, message:"Failed to Modify"})
    }
})

//PUT Modificar incidentes SOLVED
//http://127.17.0.96:5099/incidents/Solved/:id
appReportIncidents.put("/Solved/:id", async(req,res)=>{

    try {
        const {id} = req.params;
        const collection = dataBase.collection("Report_Incidents")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray()
        const {Status} = req.body
        if (my_data[0].Status == "Assigned") {
            const today = new Date();
            const date_solved = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                await collection.updateOne({
                    _id: new ObjectId(my_data[0]._id),
                },
                {
                    $set:{
                        Status: Status,
                        Date_Solved: date_solved
                    }
                })
                    
               return res.status(200).send({status:200, message:"Successfully Modified"})
        }
            await collection.updateOne({
                _id: new ObjectId(my_data[0]._id),
            },
            {
                $set:{
                    Status: Status,
                }
            })
                
            res.status(200).send({status:200, message:"Successfully Modified"})
         
    } catch (error) {
        res.status(400).send({status:400, message:"Failed to Modify"})
    }
})

//PUT Eliminar un insidente
//http://127.17.0.96:5099/incidents/:id
appReportIncidents.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const collection = dataBase.collection("Report_Incidents")
        let my_data = await collection.aggregate([
            {
                $match:{
                    ID: parseInt(id)
                }
            }
        ]).toArray();
        if (my_data.length == 0) {
            return res.status(400).send({status:400, message:"Incident not found"})
        }
        await collection.deleteOne({_id: new ObjectId(my_data[0]._id),})
                
            res.status(200).send({status:200, message:"Deleted Successfully"})
        
    } catch (error) {
        res.status(400).send({status:400, message:"Failed to Deleted"})
    }
})



export default appReportIncidents