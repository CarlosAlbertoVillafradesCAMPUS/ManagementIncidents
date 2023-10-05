import React from 'react'
import Titulos from '../../Home/components/Titulos'
import "../styles/FormularioLogin.css"
import ButtonLogin from '../../Home/components/ButtonLogin'
import useLogin from '../hook/useLogin'

export default function FormularioLogin() {

    const {stateLogin, 
        setStateLogin,
        submitLogin} = useLogin();
    
    return (
        <div>
            <Titulos name="Iniciar Sesion" styles="Login" />
            <div className='w-100 d-flex justify-content-center mt-4'>
                <form onSubmit={submitLogin} className='text-white mt-3 w-75 fs-5 formularioLogin'>
                    <div className="mb-3">
                        <label className="form-label">Email address:</label>
                        <input type="email" value={stateLogin.Email} onChange={(e)=>setStateLogin({...stateLogin, Email:e.target.value})} className="form-control" placeholder='example@gmail.com'  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password"  value={stateLogin.Password} onChange={(e)=>setStateLogin({...stateLogin, Password:e.target.value})} className="form-control" placeholder='Password' />
                    </div>
                    <div className='containerLoginHeader mt-4'>
                        <ButtonLogin type="submit" name="Iniciar session" styles="btn btn-primary ms-2 fs-6 h-50 buttonSignup" />
                    </div>
                </form>
            </div>
        </div>

    )
}
