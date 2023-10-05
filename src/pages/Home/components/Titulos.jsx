import React from 'react'
import LogoIncidents from './LogoIncidents';
import logoIncidentes from "../assets/images/iconIncidents.png"
import "../styles/Titulos.css";

export default function Titulos(props) {
  return (
    <>
    <div className='d-flex justify-content-center contentTitle'>
    <LogoIncidents image={logoIncidentes} styles="logoIncidents logoTitulos" />

    <h2 className='text-center mt-md-3 mb-md-3 mt-4 mb-4 tit_usu'>{props.name}</h2>
    </div>
    </>
  )
}
