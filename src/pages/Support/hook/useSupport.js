import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSupport = () => {
  const [stateSupport, setStateSupport] = useState({
    Nit: "",
    Nickname: "",
    Rol: "",
    Image: "",
  });

  const [incidencias, setIncidencias] = useState([]);

  const redirect = useNavigate();

  const infoSupport = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": myToken,
      }),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(`http://${sever.host}:${sever.port}/login/token`, options)
      ).json();
      if (response.status === 200) {
        console.log(response);
        if (response.data.payload.Role == "Support") {
          setStateSupport({
            Nit: parseInt(response.data.payload.Nit),
            Nickname: response.data.payload.Nickname,
            Rol: response.data.payload.Role,
            Image: response.data.payload.Image,
          });
          GetIncidencias(response.data.payload.Nit, response.data.payload.Role);
        }
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
          `http://${sever.host}:${sever.port}/incidents/ordenados?status=Solved&rol=Support&nit=${stateSupport.Nit}`,
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
            `http://${sever.host}:${sever.port}/incidents/ordenados?status=Assigned&rol=Support&nit=${stateSupport.Nit}`,
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
        await fetch(`http://${sever.host}:${sever.port}/incidents?rol=Support&nit=${nit}`, options)
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

  const SalirPage = () => {
    localStorage.removeItem("VITE_AUTH_TOKEN");
    redirect("/");
  };

  return {
    stateSupport,
    setStateSupport,
    infoSupport,
    SalirPage,
    incidencias,
    setIncidencias,
    GetAssign,
    GetSolved
    
  };
};

export default useSupport;
