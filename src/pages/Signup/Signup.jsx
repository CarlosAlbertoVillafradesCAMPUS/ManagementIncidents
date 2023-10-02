import React from 'react'
import Titulos from '../Home/components/Titulos'
import FormularioSignup from './components/FormularioSignup'
import "./styles/Signup.css"
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div className='fondoSignup'>
            <div className='container containerFormularioSignup pt-3'>
                <div className='prueba d-flex justify-content-center flex-column'>
                    <Titulos name="Registro" />
                    <div className='w-100 d-flex justify-content-center'>
                        <FormularioSignup />
                    </div>
                    <div className='mt-5 d-flex justify-content-center fs-5'>
                    <div className='d-flex'>
                        <p className='text-white fs-5'>Ya me encuentro registrado,</p>
                        <Link to={"/login"} className='fs-5 ms-2 linksRedirect'>INICIAR SESION</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
