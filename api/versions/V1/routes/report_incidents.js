import { Router } from "express";
import { myConnect } from "../../../db/connect.js";

const appReportIncidents = Router();
const dataBase = await myConnect();

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
                    "Incidents_Report._id":0
                }
               
            }
        ]).toArray()
        res.status(200).send({status:200, data:data})
    } catch (error) {
        res.status(400).send({status:200, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes materiales reportados por un campista
//http://127.17.0.96:5099/incidents/Digital?nit=1006654874
appReportIncidents.get("/:tipo", async(req,res)=>{
    try {
        const {tipo} = req.params
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
                    "Incidents_Report.Incident_Type": tipo
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
    } catch (error) {
        res.status(400).send({status:200, message:"Data retrieval error"})
    }
})


export default appReportIncidents