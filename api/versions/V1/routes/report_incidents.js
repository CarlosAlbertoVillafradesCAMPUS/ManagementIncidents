import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

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



export default appReportIncidents