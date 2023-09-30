import React, { useEffect, useState } from 'react'
import "../styles/Insidencias.css"
import ButtonLogin from '../../Home/components/ButtonLogin'
import InfoCards from './InfoCards'

export default function Insidencias(props) {

  const [infosecon, setInfoSecond] =useState([])
  const [estilosButton1, setEstilosButton1] =useState("btn btn-outline-danger text-black fs-6 buttonLogin")
  const [estilosButton2, setEstilosButton2] =useState("btn btn-primary ms-2 fs-6 buttonSignup")

  const objeto = (props.info.Inventory_id) ?props.info.Inventory_id :"Otro" 
  const info1 = [
    {
      id:0,
      titulo: "TIPO:",
      info: props.info.Incident_Type
    },
    {
      id:1,
      titulo: "ZONA:",
      info: props.info.Zone_id
    },
    {
      id:2,
      titulo: "OBJETO:",
      info: objeto
    },
  ]

  function validaSeconInfo(){
    if(props.info.Status == "Assigned" || props.info.Status == "Solved" ){
      setEstilosButton2("btn btn-primary ms-2 fs-6 buttonSignup disabled")

      const info2 = [
        {
          id:0,
          titulo: "ASIGANDO POR:",
          info: props.info.By_Trainer.Nickname
        },
        {
          id:1,
          titulo: "ASIGNADO A:",
          info: props.info.Support_Person.Nickname
        },
        {
          id:2,
          titulo: "FECHA ASIG:",
          info: props.info.Date_Assigned
        },
      ]
      if (props.info.Status == "Solved"){
        info2.push({id:3,titulo: "FECHA SOL:", info: props.info.Date_Solved})
      }
      setInfoSecond(info2)
    }
  }


  
  useEffect(()=>validaSeconInfo(),[])
  return (
    <div className='col-12 col-md-6 col-lg-4'>
      <div className="card">
        <div className={props.info.Status} >
          <div className='d-flex'>
            <div className='imageCard'></div>
            <div className=' ms-1 nicknameCard'>
              <p>VILLAFRADES</p>
            </div>
          </div>
          <div className='acom'>
            <p>{props.info.Date_Report}</p>
          </div>
          <div className='acom'>
            <p className='fw-bold text-uppercase'>{props.info.Status}</p>
          </div>
        </div>
        <div className="card-body">
          <div className='row alinn'>
            <div className='col-12 col-md-4'>
            {info1.map(item=> <InfoCards key={item.id} title={item.titulo} info={item.info} />)}
            </div>
            <div className='col-12 col-md-8'>
            {infosecon.map(item=> <InfoCards  key={item.id} title={item.titulo} info={item.info} />)}
            </div>
            <div className='col-12'>
              <p className="card-text mt-2 text-break">{props.info.Description}</p>
            </div>
            <div className='col-12 d-flex justify-content-between mt-3 comodo'>
              <div></div>
              <div>
                <ButtonLogin name="Eliminar" styles={estilosButton1} />
                <ButtonLogin name="Editar" styles={estilosButton2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
