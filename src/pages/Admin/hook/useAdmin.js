import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdmin = () => {
  const [stateAdmin, setStateAdmin] = useState({
    Nit: "",
    Nickname: "",
    Rol: "",
    Image: "",
  });
  const [listUsers, setListUsers] = useState([]);
  const [listSalones, setListSalones] = useState([]);

  const [textSearch, setTextSearch] = useState("");

  const redirect = useNavigate();

  const searchUsers = async () => {
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
          `http://${sever.host}:${sever.port}/users/SearchGeneral?text=${textSearch}`,
          options
        )
      ).json();
      if (response.status === 200) {
        setListUsers(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const infoAdmin = async () => {
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
        if (response.data.payload.Role == "Admin") {
          setStateAdmin({
            Nit: parseInt(response.data.payload.Nit),
            Nickname: response.data.payload.Nickname,
            Rol: response.data.payload.Role,
            Image: response.data.payload.Image,
          });
          GetUsers()
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

 const GetSalones = async () => {
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
          `http://${sever.host}:${sever.port}/zones/salones`,
          options
        )
      ).json();
      if (response.status === 200) {
        setListSalones(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

/*   const GetAssign = async () => {
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
            `http://${sever.host}:${sever.port}/incidents/ordenados?status=Assigned&rol=Admin&nit=${stateAdmin.Nit}`,
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
  }; */

  const GetUsers = async () => {
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
        await fetch(`http://${sever.host}:${sever.port}/users`, options)
      ).json();
      if (response.status === 200) {
        setListUsers(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SalirPage = () => {
        localStorage.removeItem("VITE_AUTH_TOKEN")
        redirect("/")
  };

  return {
    stateAdmin,
    setStateAdmin,
    infoAdmin,
    listUsers,
    setListUsers,
    searchUsers,
    textSearch,
    setTextSearch,
    listSalones,
    GetSalones
  };
};

export default useAdmin;
