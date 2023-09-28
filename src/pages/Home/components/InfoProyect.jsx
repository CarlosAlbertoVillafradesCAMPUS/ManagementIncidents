import React from 'react'
import LogoIncidents from './LogoIncidents'
import logoIncidents from "../assets/images/iconIncidents.png"
import "../styles/InfoProyect.css"

export default function InfoProyect() {
  return (
    <div className='containerDescription pt-5 pb-5'>
    <div className='descriptionProyect'>
    <LogoIncidents image={logoIncidents} styles=" me-1 logoIncidents" />
    <p className='m-0 text-center'>MANAGEMENT INCIDENTS es un proyecto diseñado en colaboracion con Campus.sa con el fin de llevar un gestionamiento efectivo y controlado de la insidencias presentadas</p>
    </div>
    </div>
  )
}
