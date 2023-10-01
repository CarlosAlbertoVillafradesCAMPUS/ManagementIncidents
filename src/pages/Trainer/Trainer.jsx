import React from 'react'
import HeaderCamper from '../Camper/components/HeaderCamper'
import ContainerCampers from './containers/ContainerCampers'
import Insidencias from '../Camper/components/Insidencias'
import ContainerInsidencias from '../Camper/containers/ContainerInsidencias'
import "./styles/Trainer.css"
import ListCamper from './components/ListCamper'

export default function Trainer() {
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
      const CampersAll=[
        {
            id:0,
            name:"Carlos"
        },
        {
            id:1,
            name:"Pedro"
        },
        {
            id:2,
            name:"Ruperto"
        }
      ]
  return (
    <>
    <div className='containerPrincipalCamper'>
      <div className='sombra'>
        <HeaderCamper />
        <div className='row containerTrainer'>
            <div className='col-12 col-md-3 containerList'>
            <ContainerCampers>
            {CampersAll.map(item=><ListCamper key={item.id} name={item.name} />)}
            </ContainerCampers>
            </div>
            <div className='col-12 col-md-9'>
            <ContainerInsidencias>
                {array.map(item => <Insidencias key={item.ID} info={item} whidCard="col-12 col-md-12 col-lg-6" />)}
            </ContainerInsidencias>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
