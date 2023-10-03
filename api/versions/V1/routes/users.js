import { Router } from "express";
import { myConnect } from "../../../db/connect.js";
import {ObjectId} from "mongodb"
import { verifyToken } from "../../../config/jwt.js";
import { validateUsersBody, validateUsersParams } from "../../../DTO/dtoUsers.js";
import { validationResult } from "express-validator";
import { validatePermisos } from "../../../config/validatePermisos.js";

const appUser = Router();
const dataBase = await myConnect();

//Listar todos los Trainers, campers o support
//http://127.17.0.96:5099/users?rol=Admin
appUser.get("/", verifyToken(), validatePermisos("get_users"), validateUsersParams, async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        if (req.query.rol) {
            const {rol} = req.query; 
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

//Listar un usuarios especifico
//http://127.17.0.96:5099/users/unico?nit=12121
appUser.get("/unico", verifyToken(), validatePermisos("get_users"), validateUsersParams, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const {nit} = req.query;
        const collection = dataBase.collection("Users")
        const data = await collection.aggregate([
            {
                $match:{
                    Nit: parseInt(nit)
                }
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
//http://127.17.0.96:5099/users/SearchGeneral?text=""
appUser.get("/SearchGeneral", validatePermisos("get_users"), verifyToken(), async(req,res)=>{
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
appUser.get("/Search", verifyToken(), validatePermisos("get_users"), async(req,res)=>{
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

//Crear un nuevo usuario
//http://127.17.0.96:5099/users
appUser.post("/", validateUsersBody, async(req,res)=>{
    /*
    {
      "Nit": 1005999685,
      "Full_Name": "John Doe",
      "Nickname": "johndoe",
      "Data_Birth": "1980-01-01",
      "Email": "john.doe@example.com",
      "Password": "anita123"
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const collection = dataBase.collection("Users")
        const infoUsers = await collection.findOne({Nit: req.body.Nit})
        if(infoUsers) return res.status(400).send({status:400, message:"There is already a USER registered with that NIT."})

        await collection.insertOne({
            ...req.body,
            Role: "Camper",
            Image: "camper.jpg"
        })
        res.status(200).send({status:200, message:"Successfully Added"})
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})

//Modificar un usuario
//http://127.17.0.96:5099/users?nit=1005999685
appUser.put("/", verifyToken(), validatePermisos("put_user"), validateUsersBody, async(req,res)=>{
    /*
    {
      "Nit": 1005999685,
      "Full_Name": "John Doe",
      "Nickname": "johndoe",
      "Data_Birth": "1980-01-01",
      "Email": "john.doe@example.com",
      "Password": "anita123"
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const {nit} = req.query;
        if (req.body.Role) {
            return   res.status(400).send({status:400, message:"Error, the Role cannot be modified."})
        }
        const collection = dataBase.collection("Users")
        let my_data = await collection.aggregate([
            {
                $match:{
                    Nit: parseInt(nit)
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


//Modificar Rol del usuario
//http://127.17.0.96:5099/users/Role?nit=1005999685
appUser.put("/Role", verifyToken(), validatePermisos("*"), validateUsersParams, async(req,res)=>{
    /*
    {
      "Nit": 1005999685,
      "Full_Name": "John Doe",
      "Nickname": "johndoe",
      "Data_Birth": "1980-01-01",
      "Email": "john.doe@example.com",
      "Password": "anita123"
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg});
    try {
        const {nit} = req.query;
        const collection = dataBase.collection("Users")
        let my_data = await collection.aggregate([
            {
                $match:{
                    Nit: parseInt(nit)
                }
            }
        ]).toArray()

        await collection.updateOne({
            _id: new ObjectId(my_data[0]._id),
        },
        {
            $set:{
                ...req.body
            }
        })
        res.status(200).send({status:200, message:"Successfully Modified"}) 
    } catch (error) {
        res.status(400).send({status:400, message:"Data retrieval error"})
    }
})



export default appUser