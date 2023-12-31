import express from "express";
import routesVersioning from "express-routes-versioning";
import RoutesV1 from "./versions/V1/index.js";
import cors from "cors"
import { loadEnv } from "vite";

const appExpress = express();
appExpress.use(express.json())
appExpress.use(cors())
let version = routesVersioning()

const env = loadEnv("development", process.cwd(), "VITE")
const my_server = JSON.parse(env.VITE_MY_SERVER)

appExpress.use(
    "/",
    version({
      "1.0.0": RoutesV1,
    })
  );

appExpress.listen(my_server, ()=>console.log(`Servidor Iniciado http://${my_server.host}:${my_server.port}`))