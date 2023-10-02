import React from 'react'
import LogoIncidents from './LogoIncidents'
import CardInfo from './CardInfo';
import logoIncidents from "../assets/images/iconIncidents.png"
import { faNotesMedical, faCircleCheck, faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";


import "../styles/InfoProyect.css"
import ButtonLogin from './ButtonLogin';
import { useNavigate } from 'react-router-dom';

export default function InfoProyect() {
  const redirect = useNavigate()
  const inforProyectItem = [
    {
      id:0,
      titulo: "Reportar Insidencias",
      icon: faNotesMedical,
      description: "Capacidad de reportar incidencias generadas en las instalaciones de Campus"
    },
    {
      id:1,
      titulo: "Personal de Apoyo",
      icon:faPersonCircleCheck,
      description: "Calificar la gravedad de las incidenciasy asignar una persona de apoyo que la pueda solucionar "
    },
    {
      id:2,
      titulo: "Solucion Insidencia",
     icon:faCircleCheck,
     description: "Una vez solucionada la incidencia se podra reportar como solucionada"
  }
  ]

  function redirectSignUp(){
    redirect("/signUp")
  }
  return (
    <div className='containerDescription'>
      <div className='containerDescriptionProyect '>
        <div className='descriptionProyect'>
        <div className='w-100 d-flex justify-content-center mb-3'>
        <LogoIncidents image={logoIncidents} styles="logoIncidents logoInfoProyecto" />
        <div className='nicknameCard'>
          <p className='m-0 pe-2 quienesSomos'>¿Ques Management Incidents?</p>
        </div>
        </div>
          <p className='m-0 text-center ps-3 pe-3 ps-md-0 pe-md-0'>MANAGEMENT INCIDENTS es un proyecto diseñado en colaboracion con Campus.sa con el fin de llevar un gestionamiento efectivo y controlado de la insidencias presentadas</p>
          <div className='w-100 d-flex justify-content-center mt-3'>
          <ButtonLogin name="Registrarse" functionClick={redirectSignUp}  styles="btn btn-primary ms-2 fs-4 h-50 buttonSignup" />
          </div>
        </div>
      </div>
      <div className='containerCardInfo'>
      <div className='row'>
      {inforProyectItem.map(item => <CardInfo key={item.id} titulo={item.titulo} image={item.icon} description={item.description}/>)}
      </div>
        </div>
    </div>
  )
}
