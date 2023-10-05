import React from 'react'
import useSignUp from '../hook/useSignUp'
import ButtonLogin from '../../Home/components/ButtonLogin'

export default function FormularioSignup() {

    const {stateSignUp,
        setStateSignUp,
        submitSignUp} = useSignUp()

    return (
        <div className='w-100 d-flex justify-content-center'>
            <form onSubmit={submitSignUp} className='text-white mt-3 w-75 fs-5'>
                <div className='row'>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Nit:</label>
                        <input type="number" value={stateSignUp.Nit} onChange={(e)=>setStateSignUp({...stateSignUp, Nit: parseInt(e.target.value)})} className="form-control" placeholder='012345678' />
                    </div>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Nombre Completo:</label>
                        <input type="text" value={stateSignUp.Full_Name} onChange={(e)=>setStateSignUp({...stateSignUp, Full_Name: e.target.value})}  className="form-control" placeholder='Nombre' />
                    </div>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Apodo:</label>
                        <input type="text" value={stateSignUp.Nickname} onChange={(e)=>setStateSignUp({...stateSignUp, Nickname: e.target.value})}  className="form-control" placeholder='Apodo' />
                    </div>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Fechas de Nacimiento:</label>
                        <input type="date" value={stateSignUp.Date_Birth} onChange={(e)=>setStateSignUp({...stateSignUp, Date_Birth: e.target.value})}  className="form-control" />
                    </div>
                    <div className=" col-12 mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" value={stateSignUp.Email} onChange={(e)=>setStateSignUp({...stateSignUp, Email: e.target.value})}  className="form-control" placeholder='example@gmail.com' />
                    </div>
                    <div className=" col-12 mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" value={stateSignUp.Password} onChange={(e)=>setStateSignUp({...stateSignUp, Password: e.target.value})}  className="form-control" placeholder='Password' />
                        <p className='fs-6'>[8-20]Caracteres</p>
                    </div>
                    <div className='col-12 containerLoginHeader mt-4'>
                        <ButtonLogin type="submit" name="Registrarme" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
                    </div>
                </div>
            </form>
        </div>
    )
}
