import React from 'react'
import ButtonLogin from '../../Home/components/ButtonLogin'
import "../styles/HeaderCamper.css"
import Profile from './Profile'
import { Link } from 'react-router-dom'

export default function HeaderCamper() {
    return (
        <nav class="navbar navbar-expand-md fondoNavbar fs-5 p-3">
            <div class="container-fluid justify-content-between">
                <Profile />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item text-center">
                            <button class="nav-link">Todas</button>
                        </li>
                        <li class="nav-item text-center">
                            <button class="nav-link ">Pendientes</button>
                        </li>
                        <li class="nav-item text-center">
                            <button class="nav-link">Calificadas</button>
                        </li>
                        <li class="nav-item text-center">
                            <button class="nav-link">Solucionadas</button>
                        </li>
                        <li class="nav-item d-block d-md-none mt-5 mb-3">
                            <div className='d-flex justify-content-center' >
                                <div>
                                <ButtonLogin name="Salir" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='containerButtonPerfil me-3 d-none d-md-flex'>
                    <ButtonLogin name="Salir" styles="btn btn-primary ms-3 fs-5 buttonSignup" />
                </div>

            </div>
        </nav>
    )
}
