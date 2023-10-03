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

  const array =[
    {
      ID: 0,
      Incident_Type: "Material",
      Inventory_id: 1,
      Zone_id: 3,
      Description: "The mouse is not working",
      Status: "Assigned",
      Date_Report: "2023-08-01",
      By_Camper: {
        Nit: 1006654874,
        Nickname: "felipesss"
      },
      Severity:"Moderate",
      By_Trainer:{
        Nit:1004344958,
        Nickname:"guest"
      },
      Support_Person:{
        Nit:1099458682,
        Nickname:"villa"
      },
      Date_Assigned: "2023-08-18"
    },
    {
        ID: 1,
      Incident_Type: "Digital",
      Inventory_id: 1,
      Zone_id: 4,
      Description: "The keyboard is not typing correctly",
      Status: "Pending",
      Date_Report: "2023-08-12",
      By_Camper: {
        Nit: 1006654874,
        Nickname: "felipesss"
      }
    },
    {
        ID: 2,
      Incident_Type: "Material",
      Zone_id: 5,
      Description: "The monitor is not displaying any image",
      Status: "Solved",
      Date_Report: "2023-09-01",
      By_Camper: {
        Nit: 1005688571,
        Nickname: "pedrosss"
      },
      Severity:"Severe",
      By_Trainer:{
        Nit:1004344958,
        Nickname:"guest"
      },
      Support_Person:{
        Nit:1099458682,
        Nickname:"villa"
      },
      Date_Assigned: "2023-09-28",
      Date_Solved:"2023-09-30"
    },
    {
        ID: 3,
      Incident_Type: "Digital",
      Zone_id: 1,
      Description: "The diadem is not connecting to the computer",
      Status: "Pending",
      Date_Report: "2023-06-11",
      By_Camper: {
        Nit: 1005688571,
        Nickname: "pedrosss"
      }
    },
  ]

  const {stateCamper,
    setStateCamper,
    infoUsers,
    incidencias} = useCamper()

    useEffect(() => {
      infoUsers()
    }, []);

  return (
    <>
    <div className='containerPrincipalCamper'>
      <div className='sombra'>
        <HeaderCamper state={stateCamper} setState={setStateCamper} />
        <div>
          <ContainerInsidencias nickname={stateCamper.Nickname}>
          {
          (incidencias[0]?.Incidents_Report.length == 0)
          ?incidencias[0]?.Incidents_Report.map(item => <Insidencias key={item.ID} infoUser={stateCamper} info={item} whidCard="col-12 col-md-6 col-lg-4" />)
          : <Inicio setShow={setShow} /> }
          </ContainerInsidencias>
        </div>
        <ButtonAgregate show={show} setShow={setShow} />
      </div>
    </div>
    {
      show && (
        <ModalIncident show={show} setShow={setShow} />
      )
    }
    </>
    
  )
}
