import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useCamper = () => {
    const [stateCamper, setStateCamper] = useState({
        Nit:"",
        Nickname:"",
        Rol:"",
        Image:"",
        ListMenu:[]
    })

    const [incidencias, setIncidencias] = useState([])

    const redirect = useNavigate()

    const GetIncidencias = async(nit, rol) => {
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
        parseInt(nit)
        let options = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": myToken
            }),
          }
          try {
            const sever =JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/incidents?rol=${rol}&nit=${nit}`, options)).json();
            if(response.status === 200){
                setIncidencias(response.data)
            } else{
              alert(response.message)
            }
          } catch (error) {
            console.log(error)
          }
    }

    const SalirPage = () =>{
        localStorage.removeItem("VITE_AUTH_TOKEN")
        redirect("/")
    }

    const infoUsers = async() =>{
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
        let options = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": myToken
            }),
          }
          try {
            const sever =JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/login/token`, options)).json();
            console.log(response);
            if(response.status === 200){
                if (response.data.payload.Role == "Camper") {
                    setStateCamper({
                        Nit: parseInt(response.data.payload.Nit),
                        Nickname: response.data.payload.Nickname,
                        Rol: response.data.payload.Role,
                        Image: response.data.payload.Image,
                        ListMenu: [
                            {
                                id:0,
                                titulo:"Todas"
                            },
                            {
                                id:1,
                                titulo:"Pendientes"
                            },
                            {
                                id:2,
                                titulo:"Calificadas"
                            },
                            {
                                id:3,
                                titulo:"Solucionadas"
                            }
                        ]
                    })
                    GetIncidencias(response.data.payload.Nit, response.data.payload.Role )
                }
                
            } else{
              alert(response.message)
            }
          } catch (error) {
            console.log(error)
          }
    }


    return{
        stateCamper,
        setStateCamper,
        infoUsers,
        SalirPage,
        incidencias
    }
}

export default useCamper