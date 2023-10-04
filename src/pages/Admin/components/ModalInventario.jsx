import React, { useEffect, useState } from "react";
import Titulos from "../../Home/components/Titulos";
import ButtonLogin from "../../Home/components/ButtonLogin";

export default function ModalInventario({showInventario, setShowInventario, zona}) {

    const [listInventario, setListInventario] = useState([])

    const getInventory = async() =>{
        console.log(zona);
        parseInt(zona)
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
            await fetch(`http://${sever.host}:${sever.port}/inventory?zoneId=${zona}`, options)
          ).json();
          if (response.status === 200) {
            console.log(response.data[0].Inventory_Info);
            setListInventario(response.data[0].Inventory_Info);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        getInventory();
      }, []);

      useEffect(() => {
        getInventory();
      }, [zona]);

  return (
    <div className="ModalBackground">
      <div className="agregateIncidents">
      <Titulos name="Inventario" />
      <div className="row">
        <div className="col-12">
        <ol className="list-group list-group-numbered">
        <div className="row">
        {listInventario.map(item=><div key={item.ID} className="col-12 col-md-6"><li key={item.ID} className="list-group-item">{item.Object.ID}. {item.Object.Name_Object}</li></div> )}
        </div>
        </ol>
        </div>
        <div>
        <div className="col-12 containerLoginHeader mt-4">
          <button
            className="btn btn-danger text-black fs-6 text-white ms-2 mt-3 mt-md-0 mb-3 buttonLogin"
            onClick={() => setShowInventario(false)}
          >
            Cerrar
          </button>
        </div>
        </div>
      </div>
       
      </div>
    </div>
  );
}
