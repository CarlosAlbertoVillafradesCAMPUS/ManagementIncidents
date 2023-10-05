import React, { useEffect, useState } from 'react'
import HeaderCamper from './components/HeaderCamper'
import ContainerInsidencias from './containers/ContainerInsidencias'
import "./styles/Camper.css"
import Insidencias from './components/Insidencias'
import ButtonAgregate from './components/ButtonAgregate'
import ModalIncident from './components/ModalIncident'
import useCamper from './hook/useCamper'
import Inicio from './components/Inicio'

export default function Camper() {

  const [show, setShow] = useState(false)

  const {stateCamper,
    setStateCamper,
    infoUsers,
    incidencias,
    GetAssign,
    GetPending,
    GetSolved} = useCamper()


    useEffect(() => {
      infoUsers()
    }, []);

    useEffect(() => {
      infoUsers()
    }, [show]);

  return (
    <>
    <div className='containerPrincipalCamper'>
      <div className='sombra'>
        <HeaderCamper getSolved={GetSolved} getAssign={GetAssign} infoUsers={infoUsers} getPending={GetPending} state={stateCamper} setState={setStateCamper} />
        <div>
          <ContainerInsidencias nickname={stateCamper.Nickname}>
          {
          (incidencias[0]?.Incidents_Report.length > 0)
          ?incidencias[0]?.Incidents_Report.map(item => <Insidencias key={item.ID} id={item.ID} infoUser={stateCamper} info={item} whidCard="col-12 col-md-6 col-lg-4" />)
          : <Inicio setShow={setShow} /> }
          </ContainerInsidencias>
        </div>
        <ButtonAgregate show={show} setShow={setShow} />
      </div>
    </div>
    {
      show && (
        <ModalIncident
        show={show}
        setShow={setShow}
        stateCamper={stateCamper} />
      )
    }
    </>
    
  )
}
