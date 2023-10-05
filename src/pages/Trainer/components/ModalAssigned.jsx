import React, { useEffect, useState } from 'react'
import Titulos from '../../Home/components/Titulos';
import ButtonLogin from '../../Home/components/ButtonLogin';
import OptionSelect from './OptionSelect';

export default function ModalAssigned({ show, setShow, stateTrainer, idIncidencia }) {
  const [stateSeverity, setStateSeverity] = useState("");
  const [statelistSupport, setStatelistSupport] = useState([]);
  const [stateNit_Support_Person, setStateNit_Support_Person] = useState("");
  const [NameSupport, setNameSupport] = useState("");

  const getSupports = async () => {
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
          `http://${sever.host}:${sever.port}/users?rol=Support`,
          options
        )
      ).json();
      if (response.status === 200) {
        setStatelistSupport(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SubmitAssigned = async(e) => {
    e.preventDefault();
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
    const myData = {
      Severity: stateSeverity,
      By_Trainer: {
        Nit: stateTrainer.Nit,
        Nickname: stateTrainer.Nickname,
      },
      Support_Person: {
        Nit: stateNit_Support_Person,
        Nickname: NameSupport,
      },
    };
    let options = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: myToken,
      }),
      body: JSON.stringify(myData),
    };
    try {
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(
          `http://${sever.host}:${sever.port}/incidents/Assign/${idIncidencia}`,
          options
        )
      ).json();
      if (response.status === 200) {
        alert(response.message)
        setShow(false)
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getSupports();
  }, []);

  return (
    <div className="ModalBackground">
      <form onSubmit={SubmitAssigned} className="agregateIncidents p-5">
        <Titulos name="Calificar y Asignar" />
        <div className="row fs-5">
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Gravedad</label>
            <select
              onChange={(e) => {
                setStateSeverity(e.target.value);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">select</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Asignar A:</label>
            <select
              onChange={(e) => {
               const optio = e.target.options[e.target.selectedIndex];
                const newNit = parseInt(e.target.value);
                setStateNit_Support_Person(newNit);
                setNameSupport(optio.text);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Persona Soporte</option>
              {statelistSupport?.map((item) => (
                <OptionSelect
                  key={item.Nit}
                  value={item.Nit}
                  name={item.Nickname}
                />
              ))}
            </select>
          </div>
          <div className="col-12 containerLoginHeader mt-4">
            <ButtonLogin
              type="submit"
              name="Calificar y Asignar"
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
