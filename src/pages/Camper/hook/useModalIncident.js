import React, { useState } from 'react'

const useModalIncident = () => {

    const [stateModal, setStateModal] = useState({
        Incident_Type: "",
        zonas: [],
        Classrooms: [],
        Inventarios: [],
        Inventory_id: "",
        Area: "",
        Zone_id: "",
        Description: ""
    })

    const GetAreas = async () => {
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
        let options = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": myToken
            }),
        }
        try {
            const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/zones/Area`, options)).json();
            if (response.status === 200) {
                setStateModal({
                    ...stateModal,
                    zonas: response.data,
                })
                console.log("Estado Zonas después de la modificación:", stateModal.zonas);
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetClassroom = async () => {
        console.log(stateModal.Area);
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
        let options = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": myToken
            }),
        }
        try {
            const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/zones/Classroom?nameArea=${stateModal.Area}`, options)).json();
            if (response.status === 200) {
                console.log(stateModal.Area)
                setStateModal({
                    ...stateModal,
                    Classrooms: response.data,
                }),
                    console.log(stateModal.Classrooms)
                console.log("Estado Zonas después de la modificación:", stateModal.Classrooms);
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetInventory = async () => {
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
        let options = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": myToken
            }),
        }
        try {
            const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/inventory?zoneId=${stateModal.Zone_id}`, options)).json();
            if (response.status === 200) {
                setStateModal({
                    ...stateModal,
                    Inventory_id: response.data,
                })
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        stateModal,
        setStateModal,
        GetAreas,
        GetClassroom,
        GetInventory
    }
}

export default useModalIncident
