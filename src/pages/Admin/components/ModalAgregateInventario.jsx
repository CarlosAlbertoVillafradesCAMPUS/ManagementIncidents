import React, { useState } from 'react'
import Titulos from '../../Home/components/Titulos';
import ButtonLogin from '../../Home/components/ButtonLogin';

export default function ModalAgregateInventario({showModalInventory, setShowModalInventory, zona}) {

    const [stateName_Object, setStateName_Object] = useState("")

    const submitInventory = async(e) =>{
        e.preventDefault();
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
        const newid = parseInt(zona)
        const myData = {
            Zone_id: newid,
          Object:{
            Name_Object: stateName_Object
          }
          
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
            await fetch(`http://${sever.host}:${sever.port}/inventory`, options)
          ).json();
          if (response.status === 200) {
            alert(response.data);
            setShowModalInventory(false);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className="ModalBackground">
    <form onSubmit={submitInventory} className="agregateIncidents p-5">
      <Titulos name="Agregar Inventario" />
      <div className="row fs-5 justify-content-center">
        <div className=" col-12 col-md-6 mb-3">
          <label className="form-label">Nombre del Objeto</label>
          <input type="text" value={stateName_Object} onChange={(e)=>setStateName_Object(e.target.value)} className="form-control" placeholder='Nuevo Objeto'  />
        </div>
        <div className="col-12 containerLoginHeader mt-4">
          <ButtonLogin
            type="submit"
            name="Agregar"
            styles="btn btn-primary ms-2 fs-6 buttonSignup"
          />
          <button
            className="btn btn-danger text-black fs-6 text-white ms-2 mt-3 mt-md-0 buttonLogin"
            onClick={() => setShowModalInventory(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}
