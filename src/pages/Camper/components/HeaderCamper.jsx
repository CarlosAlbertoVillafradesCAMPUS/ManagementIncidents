import React from 'react'
import ButtonLogin from '../../Home/components/ButtonLogin'
import "../styles/HeaderCamper.css"
import Profile from './Profile'
import useCamper from '../hook/useCamper'

export default function HeaderCamper({ state, getPending, getAssign, infoUsers, getSolved }) {
    const {
        SalirPage,
    } = useCamper()
    return (
        <nav className="navbar navbar-expand-md fondoNavbar fs-5 p-3">
            <div className="container-fluid justify-content-between">
                <Profile image={state.Image} nickname={state.Nickname} rol={state.Rol} />
                <button className="navbar-toggler custom-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav mt-3 mt-md-0">
                        <li className="nav-item d-flex justify-content-center">
                            <button onClick={infoUsers} className="nav-link">Todas</button>
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <button onClick={getPending} className="nav-link">Pendientes</button>
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <button onClick={getAssign} className="nav-link">Calificadas</button>
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <button onClick={getSolved} className="nav-link">Solucionadas</button>
                        </li>
                        <li className="nav-item d-block d-md-none mt-5 mb-3">
                            <div className='d-flex justify-content-center' >
                                <div>
                                    <ButtonLogin functionClick={SalirPage} type="button" name="Salir" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='containerButtonPerfil me-3 d-none d-md-flex'>
                    <ButtonLogin functionClick={SalirPage} type="button" name="Salir" styles="btn btn-primary ms-3 fs-5 buttonSignup" />
                </div>

            </div>
        </nav>
    )
}
