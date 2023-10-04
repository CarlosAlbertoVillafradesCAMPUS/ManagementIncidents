import React, { useEffect, useState } from "react";
import HeaderCamper from "../Camper/components/HeaderCamper";
import ContainerCampers from "./containers/ContainerCampers";
import Insidencias from "../Camper/components/Insidencias";
import ContainerInsidencias from "../Camper/containers/ContainerInsidencias";
import "./styles/Trainer.css";
import ListCamper from "./components/ListCamper";
import useTrainer from "./hook/useTrainer";
import ModalAssigned from "./components/ModalAssigned";

export default function Trainer() {
  const {
    stateTrainer,
    setStateTrainer,
    infoTrainer,
    incidencias,
    listCamper,
    GetPending,
    GetSolved,
    GetAssign,
    searchCampers,
    textSearch,
    setTextSearch,
  } = useTrainer();

  const [show, setShow] = useState(false);
  const [idIncidencia, setIdIncidencia] = useState("");

  const handelShow = () => {
    setShow(true);
  };

  let number = 0;

  useEffect(() => {
    infoTrainer();
  }, [show]);

  return (
    <>
      <div className="containerPrincipalCamper">
        <div className="sombra">
          <HeaderCamper
            infoUsers={infoTrainer}
            getAssign={GetAssign}
            getPending={GetPending}
            getSolved={GetSolved}
            state={stateTrainer}
            setState={setStateTrainer}
          />
          <div className="row containerTrainer">
            <div className="col-12 col-md-3 containerList">
              <ContainerCampers
                textSearch={textSearch}
                setTextSearch={setTextSearch}
                searchCampers={searchCampers}
              >
                {listCamper.map((item) => (
                  <ListCamper
                    key={number++}
                    id={item.nit}
                    name={item.Nickname}
                    Role={item.Role}
                  />
                ))}
              </ContainerCampers>
            </div>
            <div className="col-12 col-md-9">
              <ContainerInsidencias nickname={stateTrainer.Nickname}>
                {incidencias.map((item) => (
                  <Insidencias
                    key={item.ID}
                    camper={item.By_Camper}
                    handelShow={handelShow}
                    id={item.ID}
                    info={item}
                    setIdIncidencia={setIdIncidencia}
                    infoUser={stateTrainer}
                    whidCard="col-12 col-md-12 col-lg-6"
                  />
                ))}
              </ContainerInsidencias>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <ModalAssigned
          show={show}
          setShow={setShow}
          stateTrainer={stateTrainer}
          idIncidencia={idIncidencia}
        />
      )}
    </>
  );
}
