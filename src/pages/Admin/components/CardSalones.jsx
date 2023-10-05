import React from "react";
import "../styles/CardSalones.css";

export default function CardSalones({ info, setZona, setShowModalInventory, setShowInventario }) {

    const handleShowModalInventory = () =>{
        setShowModalInventory(true)
        setZona(info.ID)
    }

    const handleShowInventario = () => {
        setShowInventario(true)
        setZona(info.ID)
    }

    const EliminarSalon = async() => {
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
    let options = {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": myToken
        }),
    }
    try {
        const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
        const response = await (await fetch(`http://${sever.host}:${sever.port}/zones?id=${info.ID}`, options)).json();
        if (response.status === 200) {
            alert(response.message)
            window.location.reload()

        } else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error)
    }
    }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="d-flex flex-column containerCardSalones ">
        <div className="containerImageSalones">
          <div className="imageSalones"></div>
        </div>
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <p className=" fs-5 me-1 fw-bold text-primary">{info.ID}.</p>
            <p className="fs-5 fw-bold text-white">{info.Classroom}</p>
          </div>
          <p className="text-white">{info.Area}</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
            <button onClick={EliminarSalon} type="button" className="btn btn-danger text-white ms-2 mt-3 mt-md-0 buttonSalonesPro">Eliminar</button>
            <button onClick={handleShowInventario} type="button" className="btn btn-secondary text-white ms-2 mt-3 mt-md-0 buttonSalonesPro">Ver Inventario</button>
            <button onClick={handleShowModalInventory} type="button" className="btn btn-primary text-white ms-2 mt-3 mt-md-0 buttonSignup buttonSalonesPro">Agregar Inv</button>
        </div>
      </div>
    </div>
  );
}
