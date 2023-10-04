import React, { useEffect, useState } from "react";
import "../styles/ListCamper.css";

export default function ListCamper({ Nit, name, Role, setIncidencias }) {
  const [imageUser, setImageUsers] = useState("");

  const GetPendingCamper = async () => {
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
      parseInt(Nit);
      console.log(Nit);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/incidents/ordenados?status=Pending&rol=Camper&nit=${Nit}`,
          options
        )
      ).json();
      if (response.status === 200) {
        console.log(response);
        if(response.data.length === 0){
          setIncidencias([]);
        }else{
          setIncidencias(response.data[0].Incidents_Report);
        }
        
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Role == "Camper") {
      setImageUsers("imageUsersCampers");
    } else {
      setImageUsers("imageUsersTrainers");
    }
  }, []);

  return (
    <>
      <li className="list-group-item bg-transparent">
        <button
          className="d-flex buttonCampersList"
          type="button"
          onClick={() => GetPendingCamper()}
        >
          <div className={imageUser}></div>
          <div className="centerNameCamper">
            <p className="fw-bold textNickname">{name}</p>
            <p className="text-white">{Role}</p>
          </div>
        </button>
      </li>
    </>
  );
}
