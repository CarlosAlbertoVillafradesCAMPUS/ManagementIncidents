import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTrainer = () => {
  const [stateTrainer, setStateTrainer] = useState({
    Nit: "",
    Nickname: "",
    Rol: "",
    Image: "",
    ListMenu: [],
  });

  const [listCamper, setListCamper] = useState([]);

  const [incidencias, setIncidencias] = useState([]);

  const [textSearch, setTextSearch] = useState("");

  const redirect = useNavigate();

  const infoTrainer = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(`http://${sever.host}:${sever.port}/login/token`, options)
      ).json();
      if (response.status === 200) {
        if (response.data.payload.Role == "Trainer") {
          setStateTrainer({
            Nit: parseInt(response.data.payload.Nit),
            Nickname: response.data.payload.Nickname,
            Rol: response.data.payload.Role,
            Image: response.data.payload.Image,
            ListMenu: [
              {
                id: 0,
                titulo: "Todas",
                func: "GetPending",
              },
              {
                id: 1,
                titulo: "Pendientes",
                func: "GetPending",
              },
              {
                id: 2,
                titulo: "Calificadas",
                func: "GetAssign",
              },
              {
                id: 3,
                titulo: "Solucionadas",
                func: "GetAssign",
              },
            ],
          });
          GetIncidencias(response.data.payload.Nit, response.data.payload.Role);
          CampersAll();
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CampersAll = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/users?rol=Camper`,
          options
        )
      ).json();
      if (response.status === 200) {
        setListCamper(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetPending = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/incidents/ordenados?status=Pending`,
          options
        )
      ).json();
      if (response.status === 200) {
        let newArray = [];
        response.data.forEach((val, id) => {
          newArray.push({
            By_Camper: {
              Nit: val.By_Camper.Nit,
              Nickname: val.By_Camper.Nickname,
            },
            Date_Report: val.Date_Report,
            Description: val.Description,
            ID: val.ID,
            Incident_Type: val.Incident_Type,
            Inventory_id: val.Inventory_id ? val.Inventory_id : "Otro",
            Status: val.Status,
            Zone_id: val.Zone_Info.ID,
          });
        });
        setIncidencias(newArray);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetSolved = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/incidents/ordenados?status=Solved&rol=Trainer&nit=${stateTrainer.Nit}`,
          options
        )
      ).json();
      if (response.status === 200) {
        setIncidencias(response.data[0].Incidents_Report);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAssign = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/incidents/ordenados?status=Assigned&rol=Trainer&nit=${stateTrainer.Nit}`,
          options
        )
      ).json();
      if (response.status === 200) {
        console.log(response);
        setIncidencias(response.data[0].Incidents_Report);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetIncidencias = async (nit, rol) => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    parseInt(nit);
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(`http://${sever.host}:${sever.port}/incidents`, options)
      ).json();
      if (response.status === 200) {
        setIncidencias(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SalirPage = () => {
    localStorage.removeItem("VITE_AUTH_TOKEN");
    redirect("/");
  };

  const searchCampers = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/users/Search?rol=Camper&text=${textSearch}`,
          options
        )
      ).json();
      if (response.status === 200) {
        setListCamper(response.data)
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    stateTrainer,
    setStateTrainer,
    infoTrainer,
    SalirPage,
    incidencias,
    listCamper,
    setListCamper,
    GetPending,
    GetSolved,
    GetAssign,
    searchCampers,
    textSearch,
    setTextSearch,
  };
};

export default useTrainer;
