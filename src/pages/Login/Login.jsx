import React from 'react'
import BannerLogin from './components/BannerLogin'
import FormularioLogin from './components/FormularioLogin'
import "./styles/Login.css"
import { Link } from 'react-router-dom'

export default function Login() {

    return (
        <div className='containerPrincipalLogin row'>
            <BannerLogin />
            <div className='containerFormulario col-md-4'>
                <FormularioLogin />
                <div className='mt-3 d-flex justify-content-center pb-5'>
                    <div className='d-flex'>
                        <p className='text-white fs-5'>¿No tienes una cuenta?</p>
                        <Link to={"/signUp"} className='fs-5 ms-2 linksRedirect'>REGISTRATE</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
