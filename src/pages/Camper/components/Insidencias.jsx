import React, { useEffect, useState } from 'react'
import "../styles/Insidencias.css"
import ButtonLogin from '../../Home/components/ButtonLogin'
import InfoCards from './InfoCards'
import { useNavigate } from 'react-router-dom'

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

  const EliminarIncidents = async () => {
    const myToken = localStorage.getItem("VITE_AUTH_TOKEN")
    let options = {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": myToken
        }),
    }
    try {
        const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
        const response = await (await fetch(`http://${sever.host}:${sever.port}/incidents/${props.id}`, options)).json();
        if (response.status === 200) {
            alert(response.message)
            window.location.reload()

        } else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error)
    }
}

const [imageProfile, setImageProfile] = useState("") 
const [nameProfile, setNameProfile] = useState("") 
const [listButton, setListButton] = useState([]) 

    const StylesProfile = () =>{
      setImageProfile("imageProfileCamper")
      if (props.infoUser.Image == "trainer.jpg") {
        setListButton([
          {
            id:0,
            type:"button",
            name:"Calificar y Asignar",
            styles: estilosButton2,
            My_function: EliminarIncidents
          }
        ])
        if(props.info.Status == "Assigned" || props.info.Status == "Solved" ){
          setListButton([])
    
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
        setNameProfile(props.camper.Nickname)
      }else{
        setListButton([
          {
            id:0,
            type:"button",
            name:"Eliminar",
            styles: estilosButton1,
            My_function: EliminarIncidents
          }
        ]
        )
        if(props.info.Status == "Assigned" || props.info.Status == "Solved" ){
          setListButton([])
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
        setNameProfile(props.infoUser.Nickname)
      }
    }


  


  useEffect(() => { 
    StylesProfile()
    }, []);

  


  return (
    <div className={props.whidCard}>
      <div className="card">
        <div className={props.info.Status} >
          <div className='d-flex'>
            <div className={imageProfile}></div>
            <div className=' ms-1 nicknameCard'>
              <p className='fw-bold'>{nameProfile}</p>
            </div>
          </div>
          <div className='containerSeverity'>
            <p>{
            (props.info.Severity)
            ?props.info.Severity
            :""}</p>
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
              <p className="card-text mt-2 text-break fw-bold">{props.info.Description}</p>
            </div>
            <div className='col-12 d-flex justify-content-between mt-3 comodo'>
            <div className='acom'>
              <p>{props.info.Date_Report}</p>
          </div>
              <div>
                {listButton?.map(item=><ButtonLogin key={item.id} functionClick={item.My_function} type={item.type} name={item.name} styles={item.styles} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
