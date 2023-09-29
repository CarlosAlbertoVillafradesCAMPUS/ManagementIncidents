import React from 'react'
import Titulos from '../../Home/components/Titulos'
import "../styles/FormularioLogin.css"
import ButtonLogin from '../../Home/components/ButtonLogin'

export default function FormularioLogin() {
    return (
        <div>
            <Titulos name="Iniciar Sesion" styles="Login" />
            <div className='w-100 d-flex justify-content-center'>
                <form className='text-white mt-3 w-75 fs-5 formularioLogin'>
                    <div className="mb-3">
                        <label className="form-label">Email address:</label>
                        <input type="email" className="form-control" placeholder='example@gmail.com'  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" placeholder='Password' />
                    </div>
                    <div className='containerLoginHeader mt-4'>
                        <ButtonLogin name="Iniciar session" styles="btn btn-primary ms-2 fs-6 h-50 buttonSignup" />
                    </div>
                </form>
            </div>
        </div>

    )
}
