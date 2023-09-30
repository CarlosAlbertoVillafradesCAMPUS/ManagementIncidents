import React from 'react'
import ButtonLogin from '../../Home/components/ButtonLogin'

export default function FormularioSignup() {
    return (
        <div className='w-100 d-flex justify-content-center'>
            <form className='text-white mt-3 w-75 fs-5'>
                <div className='row'>
                    <div className="col-6 mb-3">
                        <label className="form-label">Nit:</label>
                        <input type="number" className="form-control" placeholder='012345678' />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Nombre Completo:</label>
                        <input type="text" className="form-control" placeholder='Nombre' />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Apodo:</label>
                        <input type="text" className="form-control" placeholder='Apodo' />
                    </div>
                    <div className=" col-6 mb-3">
                        <label className="form-label">Fechas de Nacimiento:</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className=" col-12 mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" placeholder='example@gmail.com' />
                    </div>
                    <div className=" col-12 mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" placeholder='Password' />
                    </div>
                    <div className='col-12 containerLoginHeader mt-4'>
                        <ButtonLogin name="Registrarme" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
                    </div>
                </div>

            </form>
        </div>
    )
}
