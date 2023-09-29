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
                <div>
                    <p>Pie de pagina</p>
                </div>
            </div>
        </div>
    )
}
