import React from 'react'
import LogoIncidents from './LogoIncidents';
import logoIncidentes from "../assets/images/iconIncidents.png"
import "../styles/Titulos.css";

export default function Titulos(props) {
  return (
    <>
    <div className='d-flex justify-content-center contentTitle'>
    <LogoIncidents image={logoIncidentes} styles="logoIncidents logoTitulos" />

    <h2 className='text-center mt-3 mb-3 tit_usu'>{props.name}</h2>
    </div>
    </>
  )
}
