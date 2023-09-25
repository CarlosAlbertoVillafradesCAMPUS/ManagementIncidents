import { SignJWT, jwtVerify } from "jose";
import {myConnect} from "../db/connect.js"
import { loadEnv } from "vite";
const dataBase = await myConnect()

const env = loadEnv("development", process.cwd(), "VITE")

const generateToken = async (req,res,next) =>{
    if(Object.keys(req.body).length === 0) return res.status(400).send({status:400, message:"Data not submitted"})
    const coleccion = dataBase.collection("Users")
    const checkUser = await coleccion.findOne({Email: req.body.Email});
    if(!checkUser) return res.status(401).send({status:401, message:"Error, User not found"})
    const result = await coleccion.findOne({Email: req.body.Email, Password: req.body.Password});
    if(!result) return res.status(401).send({status:401, message:"Incorrect password"})

    const collectionRoles =  dataBase.collection("Roles");
    const Role = await collectionRoles.findOne({Name: result.Role})

    const encoder = new TextEncoder();
    const dataToken = {
        id: result._id.toString(),
        Nickname: result.Nickname,
        Nit: result.Nit,
        Role: Role.Name,
        Permission: Role.Permission
    }
    const dataInfo = {
        id: result._id.toString(),
        Nit: result.Nit
    }
    const jwtConstructor = await new SignJWT(dataToken)
        .setProtectedHeader({alg:'HS256', typ:'JWT'})
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(env.VITE_JWT_PRIVATE_KEY))

        req.data = {status: 200, ...dataInfo , token: jwtConstructor};
        next()
}

const verifyToken = () => async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(400).json({ status: 400, message: "Please generate token" });
      try {
        const encoder = new TextEncoder();
        req.data = await jwtVerify(
          authorization,
          encoder.encode(env.VITE_JWT_PRIVATE_KEY)
        );
        next();
      } catch (error) {
        res.status(498).send({status:498, message: "Something went wrong, can you please generate a token?"});
      }
   
  };

  export {
    generateToken,
    verifyToken
  }