import React from 'react'
import Titulos from '../Home/components/Titulos'
import FormularioSignup from './components/FormularioSignup'
import "./styles/Signup.css"

export default function Signup() {
    return (
        <div className='fondoSignup'>
            <div className='container containerFormularioSignup pt-3'>
                <div className='prueba'>
                    <Titulos name="Registro" />
                    <div className='w-100 d-flex justify-content-center'>
                        <FormularioSignup />
                    </div>
                    <div className='mt-5 text-center text-white fs-5'>
                        <p>Ya me encuentro registrado, INICIAR SESION</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
