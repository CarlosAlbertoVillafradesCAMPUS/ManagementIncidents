import express from "express";

const appExpress = express();

const my_server = {
    port: 5099,
    host: "127.17.0.96"
}

appExpress.listen(my_server, ()=>console.log(`Servidor Iniciado http://${my_server.host}:${my_server.port}`))