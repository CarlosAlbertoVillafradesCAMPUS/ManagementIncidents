import React, { useEffect, useState } from 'react'
import HeaderCamper from '../Camper/components/HeaderCamper'
import ContainerCampers from '../Trainer/containers/ContainerCampers'
import ContainerInsidencias from '../Camper/containers/ContainerInsidencias'
import Insidencias from '../Camper/components/Insidencias'
import ListCamper from '../Trainer/components/ListCamper'
import HeaderSupport from './components/HeaderSupport'
import useSupport from './hook/useSupport'

export default function Support() {

      const {
        stateSupport,
    setStateSupport,
    infoSupport,
    incidencias,
    setIncidencias,
    GetAssign,
    GetSolved
      } = useSupport()

      const [idIncidencia, setIdIncidencia] = useState("");
      const [show, setShow] = useState(false);

      const handelShow = () => {
        setShow(true);
      };

      useEffect(() => {
        infoSupport();
      }, []);

  return (
    <>
    <div className='containerPrincipalCamper'>
      <div className='sombra'>
        <HeaderSupport
            infoUsers={infoSupport}
            getAssign={GetAssign}
            getSolved={GetSolved}
            state={stateSupport}
            setState={setStateSupport} 
            />
        <div className='row containerTrainer'>
            <div className='col-12'>
            <ContainerInsidencias nickname={stateSupport.Nickname}>
                {incidencias.map(item => <Insidencias 
                      key={item.ID}
                      camper={item.By_Camper}
                      handelShow={handelShow}
                      id={item.ID}
                      info={item}
                      setIdIncidencia={setIdIncidencia}
                      infoUser={stateSupport}
                      whidCard="col-12 col-md-12 col-lg-6" />)}
            </ContainerInsidencias>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
