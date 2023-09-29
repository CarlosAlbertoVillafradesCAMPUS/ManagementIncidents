import React from 'react'
import BannerLogin from './components/BannerLogin'
import FormularioLogin from './components/FormularioLogin'
import "./styles/Login.css"

export default function Login() {
    return (
        <div className='containerPrincipalLogin row '>
            <BannerLogin />
            <div className='containerFormulario col-4'>
                <FormularioLogin />
                <div className='mt-3 text-center pb-5'>
                    <p className='text-white fs-5'>¿No tienes una cuenta? REGISTRATE</p>
                </div>
            </div>
        </div>
    )
}
