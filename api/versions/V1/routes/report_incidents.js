import { Router } from "express";
import { myConnect } from "../../../db/connect.js";
import {ObjectId} from "mongodb"
import { verifyToken } from "../../../config/jwt.js";
import { validateIncidentsBody, validateIncidentsParams } from "../../../DTO/dtoIncidents.js";
import { validationResult } from "express-validator";
import { autoIncrement } from "../../../helpers/autoincrement.js";
import { validatePermisos } from "../../../config/validatePermisos.js";

const appReportIncidents = Router();
const dataBase = await myConnect();

appReportIncidents.use(verifyToken())
//Listar todos los incidentes Ordenados del mas reciente al mas antiguo dependiendo el status
//http://127.17.0.96:5099/incidents/ordenados?status=Pending&rol=Camper&nit=123434
appReportIncidents.get("/Ordenados", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        if ( req.query.rol) {
            const {status, nit, rol} = req.query;
            const collection = dataBase.collection("Users")
            if (rol == "Support") {
                const data = await collection.aggregate([
                    {
                        $lookup: {
                          from: "Report_Incidents",
                          localField: "Nit",
                          foreignField: `Support_Person.Nit`,
                          as: "Incidents_Report"
                        }
                    },
                    {
                        $unwind: "$Incidents_Report"
                      },
                      {
                        $match: {
                            Nit: parseInt(nit),
                          "Incidents_Report.Status": status
                        }
                      },
                      {
                        $sort: {
                          "Incidents_Report.Date_Report": -1
                        }
                        },
                      {
                        $group: {
                          _id: "$_id",
                          User: { $first: "$$ROOT" },
                          "Incidents_Report": { $push: "$Incidents_Report" }
                        }
                      },
                      {
                        $project:{
                            _id:0,
                            "User._id":0,
                            "User.Password":0,
                            "User.Incidents_Report":0,
                            "Incidents_Report._id":0,
                            [`Incidents_Report.Support_Person`]:0
                        }
                      }
                ]).toArray()
               return res.status(200).send({status:200, data:data})
            }
            const data = await collection.aggregate([
                {
                    $lookup: {
                      from: "Report_Incidents",
                      localField: "Nit",
                      foreignField: `By_${rol}.Nit`,
                      as: "Incidents_Report"
                    }
                },
                {
                    $unwind: "$Incidents_Report"
                  },
                  {
                    $match: {
                        Nit: parseInt(nit),
                      "Incidents_Report.Status": status
                    }
                  },
                  {
                    $sort: {
                      "Incidents_Report.Date_Report": -1
                    }
                    },
                  {
                    $group: {
                      _id: "$_id",
                      User: { $first: "$$ROOT" },
                      "Incidents_Report": { $push: "$Incidents_Report" }
                    }
                  },
                  {
                    $project:{
                        _id:0,
                        "User._id":0,
                        "User.Password":0,
                        "User.Incidents_Report":0,
                        "Incidents_Report._id":0,
                    }
                  }
            ]).toArray()
           return res.status(200).send({status:200, data:data})
        }
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
                    $project: {
                      _id:0,
                    }
                }
            ]).toArray()
            res.status(200).send({status:200, data:data})
       
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})




//Listar todos los incidentes reportados por un campista específico
//http://127.17.0.96:5099/incidents?rol=Trainer&nit=111111111
appReportIncidents.get("/", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        if (req.query.rol) {
            const {rol, nit} = req.query; 
            const collection = dataBase.collection("Users")
            const data = await collection.aggregate([
                {
                    $lookup: {
                      from: "Report_Incidents",
                      localField: "Nit",
                      foreignField: `By_${rol}.Nit`,
                      as: "Incidents_Report"
                    }
                },
                {
                    $unwind: "$Incidents_Report"
                  },
                  {
                    $match: {
                        Nit: parseInt(nit),
                    }
                  },
                  {
                    $sort: {
                      "Incidents_Report.Date_Report": -1
                    }
                    },
                  {
                    $group: {
                      _id: "$_id",
                      User: { $first: "$$ROOT" },
                      "Incidents_Report": { $push: "$Incidents_Report" }
                    }
                  },
                  {
                    $project:{
                        _id:0,
                        "User._id":0,
                        "User.Password":0,
                        "User.Incidents_Report":0,
                        "Incidents_Report._id":0,
                        [`Incidents_Report.By_${rol}`]:0
                    }
                  }
            ]).toArray()
           return res.status(200).send({status:200, data:data})
        }
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.aggregate([
                {$sort:{Date_Report: -1}}
            ]).toArray()
            res.status(200).send({status:200, data:data})
      
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes materiales reportados por un campista
//http://127.17.0.96:5099/incidents/Material?rol=camper&nit=1005688571
appReportIncidents.get("/Material",validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        if (req.query.rol) {
            const {rol, nit} = req.query; 
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $lookup: {
                  from: "Report_Incidents",
                  localField: "Nit",
                  foreignField: `By_${rol}.Nit`,
                  as: "Incidents_Report"
                }
            },
            {
                $unwind: "$Incidents_Report"
              },
              {
                $match: {
                    Nit: parseInt(nit),
                  "Incidents_Report.Incident_Type": "Material"
                }
              },
              {
                $sort: {
                  "Incidents_Report.Date_Report": -1
                }
                },
              {
                $group: {
                  _id: "$_id",
                  User: { $first: "$$ROOT" },
                  "Incidents_Report": { $push: "$Incidents_Report" }
                }
              },
              {
                $project:{
                    _id:0,
                    "User._id":0,
                    "User.Password":0,
                    "User.Incidents_Report":0,
                    "Incidents_Report._id":0,
                    [`Incidents_Report.By_${rol}`]:0
                }
              }
        ]).toArray()
        return res.status(200).send({status:200, data:data})
        }
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.aggregate([
                {
                    $match:{
                        "Incident_Type": "Material"
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
        
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes Digitales reportados por un campista
//http://127.17.0.96:5099/incidents/Digital?rol=camper&nit=1006654874
appReportIncidents.get("/Digital", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        if (req.query.rol) {
            const {rol, nit} = req.query; 
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $lookup: {
                  from: "Report_Incidents",
                  localField: "Nit",
                  foreignField: `By_${rol}.Nit`,
                  as: "Incidents_Report"
                }
            },
            {
                $unwind: "$Incidents_Report"
              },
              {
                $match: {
                    Nit: parseInt(nit),
                  "Incidents_Report.Incident_Type": "Digital"
                }
              },
              {
                $sort: {
                  "Incidents_Report.Date_Report": -1
                }
                },
              {
                $group: {
                  _id: "$_id",
                  User: { $first: "$$ROOT" },
                  "Incidents_Report": { $push: "$Incidents_Report" }
                }
              },
              {
                $project:{
                    _id:0,
                    "User._id":0,
                    "User.Password":0,
                    "User.Incidents_Report":0,
                    "Incidents_Report._id":0,
                    [`Incidents_Report.By_${rol}`]:0
                }
              }
        ]).toArray()
        return res.status(200).send({status:200, data:data})
        }
            const collection = dataBase.collection("Report_Incidents")
            const data = await collection.aggregate([
                {
                    $match:{
                        "Incident_Type": "Digital"
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
        
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Listar todos los incidentes reportados en el área de revisión
//http://127.17.0.96:5099/incidents/Area?nameArea=Training&nit=12131
appReportIncidents.get("/Area", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
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
appReportIncidents.get("/Classroom", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
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
appReportIncidents.post("/", validatePermisos("post_reportIncidents"), validateIncidentsBody, async(req,res)=>{
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
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const collection = dataBase.collection("Report_Incidents")
        const today = new Date();
        const date_report = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let newId = await autoIncrement("Report_Incidents")
        await collection.insertOne({
            ID:newId,
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
appReportIncidents.put("/:id", validatePermisos("put_reportIncidents"), validateIncidentsBody, async(req,res)=>{
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
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});    
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
appReportIncidents.put("/Assign/:id", validatePermisos("put_assigReportIncidents"), async(req,res)=>{
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
appReportIncidents.put("/Solved/:id", validatePermisos("put_solvedReportIncidents"), async(req,res)=>{

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
appReportIncidents.delete("/:id", validatePermisos("delete_reportIncidents"), async(req,res)=>{
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
        await collection.deleteOne({_id: new ObjectId(my_data[0]._id)})
                
            res.status(200).send({status:200, message:"Deleted Successfully"})
        
    } catch (error) {
        res.status(400).send({status:400, message:"Failed to Deleted"})
    }
})

//Listar las incidentes asignados a un personal de apoyo especifico
//http://127.17.0.96:5099/incidents/Assigned?supportNit="Pending"
appReportIncidents.get("/Assigned", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const {supportNit} = req.params;
        const collection = dataBase.collection("Users")
        let my_data = await collection.aggregate([
            {
             $lookup: {
               from: "Report_Incidents",
               localField: "Nit",
               foreignField: "Support_Person.Nit",
               as: "Incidents"
             }
            },
            {
             $match: {
                 Nit: parseInt(supportNit),
               "Incidents.Status":"Assigned"
             }
            },
            {
                $sort:{
                    "Incidents.Date_Assigned": -1
                }
            },
            {
                _id:0,
                Password:0,
                "Incidents._id":0,
                "Incidents.Support_Person":0
            }
         ]).toArray();
                
            res.status(200).send({status:200, message:my_data})
        
    } catch (error) {
        res.status(400).send({status:400, message:"Error fetching data"})
    }
})

//Listar las incidentes solucionados por un personal de apoyo especifico
//http://127.17.0.96:5099/incidents/Solved?supportNit="Pending"
appReportIncidents.get("/Solved", validatePermisos("get_reportIncidents"), validateIncidentsParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const {supportNit} = req.params;
        const collection = dataBase.collection("Users")
        let my_data = await collection.aggregate([
            {
             $lookup: {
               from: "Report_Incidents",
               localField: "Nit",
               foreignField: "Support_Person.Nit",
               as: "Incidents"
             }
            },
            {
             $match: {
                 Nit: parseInt(supportNit),
               "Incidents.Status":"Solved"
             }
            },
            {
                $sort:{
                    "Incidents.Date_Solved": -1
                }
            },
            {
                _id:0,
                Password:0,
                "Incidents._id":0,
                "Incidents.Support_Person":0
            }
         ]).toArray();
                
            res.status(200).send({status:200, message:my_data})
        
    } catch (error) {
        res.status(400).send({status:400, message:"Error fetching data"})
    }
})




export default appReportIncidents