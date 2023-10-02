import React from 'react'
import ButtonLogin from './ButtonLogin'
import LogoIncidents from './LogoIncidents'
import logoIncidents from "../assets/images/iconIncidents.png"
import logoCampus from "../assets/images/logoCampus-removebg-preview.png"
import "../styles/HeaderHome.css"
import { useNavigate } from 'react-router-dom'


export default function HeaderHome() {
  const redirect = useNavigate()
  function redirectLogin(){
    redirect("/login")
  }
  function redirectSignUp(){
    redirect("/signUp")
  }
  return (
    <header className='w-100'>
    <div className='containerLogoHeader pt-2'>
        <LogoIncidents image={logoIncidents} styles="logoIncidents" />
        <LogoIncidents image={logoCampus} styles="logoIncidents" />
    </div>
    <div className='containerLoginHeader'>
    <ButtonLogin name="Iniciar sesion" functionClick={redirectLogin} styles="btn ms-2 mb-2 h-50 mt-2 mb-md-0 mt-md-0 buttonLogin"/>
    <ButtonLogin name="Registrarse" functionClick={redirectSignUp}    styles="btn btn-primary ms-2 h-50 buttonSignup"/>
    </div>
    </header>
  )
}
