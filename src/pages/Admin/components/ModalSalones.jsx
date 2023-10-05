import React, { useState } from 'react'
import Titulos from '../../Home/components/Titulos';
import ButtonLogin from '../../Home/components/ButtonLogin';

export default function ModalSalones({showModalSalones, setShowModalSalones}) {

    const [stateModalSalones, setStateModalSalones] = useState({
        Area:"",
        Classroom:""
    })

    const submitSalones = async(e) =>{
        e.preventDefault();
        const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
        const myData = {
          Area: stateModalSalones.Area,
          Classroom: stateModalSalones.Classroom
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
            await fetch(`http://${sever.host}:${sever.port}/zones`, options)
          ).json();
          if (response.status === 200) {
            alert(response.message);
            setShowModalSalones(false);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className="ModalBackground">
      <form onSubmit={submitSalones} className="agregateIncidents p-5">
        <Titulos name="Agregar Salon" />
        <div className="row fs-5">
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Area</label>
            <select
              onChange={(e) => {
                setStateModalSalones({
                    ...stateModalSalones,
                    Area:e.target.value
                });
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">select</option>
              <option value="Training">Training</option>
              <option value="Review">Review</option>
              <option value="Hunters">Hunters</option>
              <option value="Auditorium">Auditorium</option>
              <option value="Cafeteria">Cafeteria</option>
            </select>
          </div>
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Nombre del Salon</label>
            <input type="text" value={stateModalSalones.Classroom} onChange={(e)=>setStateModalSalones({...stateModalSalones, Classroom:e.target.value})} className="form-control" placeholder='Nuevo Salon'  />
          </div>
          <div className="col-12 containerLoginHeader mt-4">
            <ButtonLogin
              type="submit"
              name="Agregar"
              styles="btn btn-primary ms-2 fs-6 buttonSignup"
            />
            <button
              className="btn btn-danger text-black fs-6 text-white ms-2 mt-3 mt-md-0 buttonLogin"
              onClick={() => setShowModalSalones(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
