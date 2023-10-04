import React, { useEffect, useState } from "react";
import ButtonLogin from "../../Home/components/ButtonLogin";
import "../styles/ModalIncident.css";
import Titulos from "../../Home/components/Titulos";

export default function ModalIncident({ show, setShow, stateCamper }) {
  const [Area, setArea] = useState("");
  const [Incident_Type, setIncident_Type] = useState("");
  const [Inventory_id, setInventory_id] = useState(0);
  const [Zone_id, setZone_id] = useState(0);
  const [Description, setDescription] = useState("");
  const [Zonas, setZonas] = useState([]);
  const [Classrooms, setClassrooms] = useState([]);
  const [Inventarios, setInventarios] = useState([]);

  const GetAreas = async () => {
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
        await fetch(`http://${sever.host}:${sever.port}/zones/Area`, options)
      ).json();
      if (response.status === 200) {
        setZonas(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetClassroom = async () => {
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
          `http://${sever.host}:${sever.port}/zones/Classroom?nameArea=${Area}`,
          options
        )
      ).json();
      if (response.status === 200) {
        setClassrooms(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetInventory = async () => {
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
          `http://${sever.host}:${sever.port}/inventory?zoneId=${Zone_id}`,
          options
        )
      ).json();
      if (response.status === 200) {
        setInventarios(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitReportIncident = async (e) => {
    e.preventDefault();
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    const myData = {
      Incident_Type: Incident_Type,
      Inventory_id: Inventory_id,
      Zone_id: Zone_id,
      Description: Description,
      By_Camper: {
        Nit: stateCamper.Nit,
        Nickname: stateCamper.Nickname,
      },
    };
    let options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
      body: JSON.stringify(myData),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(`http://${sever.host}:${sever.port}/incidents`, options)
      ).json();
      if (response.status === 200) {
        alert(response.message);
        setShow(false);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAreas();
  }, []);

  useEffect(() => {
    GetClassroom();
  }, [Area]);

  useEffect(() => {
    GetInventory();
  }, [Zone_id]);

  return (
    <div className="ModalBackground">
      <form onSubmit={submitReportIncident} className="agregateIncidents p-5">
        <Titulos name="Reportar Incidencia" />
        <div className="row fs-5">
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Tipo de incidencia:</label>
            <select
              onChange={(e) => {
                setIncident_Type(e.target.value);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Tipo de incidencia</option>
              <option value="Material">Material</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Zona:</label>
            <select
              onChange={(e) => {
                setArea(e.target.value);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="a">Zona</option>
              {Zonas?.map((item) => (
                <option key={item.Area} value={item.Area}>
                  {item.Area}
                </option>
              ))}
            </select>
          </div>
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Zone_id:</label>
            <select
              onChange={(e) => {
                const newId = parseInt(e.target.value);
                setZone_id(newId);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              {Classrooms?.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.Classroom}
                </option>
              ))}
            </select>
          </div>
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Inventario:</label>
            <select
              value={Inventory_id}
              onChange={(e) => {
                const newId = parseInt(e.target.value);
                setInventory_id(newId);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Otro</option>
              {Inventarios != [] &&
                Inventarios[0]?.Inventory_Info.map((item) => (
                  <option key={item.ID} value={item.ID}>
                  {item.ID}. {item.Object.Name_Object}
                  </option>
                ))}
            </select>
          </div>
          <div className=" col-12 mb-3">
            <label className="form-label">Describe la incidencia:</label>
            <textarea
              className="form-control"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <div className="col-12 containerLoginHeader mt-4">
            <ButtonLogin
              type="submit"
              name="Agregar"
              styles="btn btn-primary ms-2 fs-6 buttonSignup"
            />
            <button
              className="btn btn-danger text-black fs-6 text-white ms-2 mt-3 mt-md-0 buttonLogin"
              onClick={() => setShow(!show)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
