import React, { useEffect, useState } from 'react'
import ButtonLogin from '../../Home/components/ButtonLogin'
import Profile from '../../Camper/components/Profile'
import "../styles/HeaderSupport.css"
import useCamper from '../../Camper/hook/useCamper'
import { useNavigate } from 'react-router-dom'

export default function HeaderSupport({
            infoUsers,
            state,
            setState,
            listMenu
}) {

    const redirect = useNavigate()
    const salirLogout = () =>{
        redirect("/")
        localStorage.removeItem("VITE_AUTH_TOKEN")
    }

    const [imageProfile, setImageProfile] = useState("") 

    const StylesProfile = () =>{
        if(state.Image == "support.jpg"){
            setImageProfile("imageProfileSupport")
        }else if(state.Image == "admin.jpg"){
            setImageProfile("imageProfileAdmin")
        }
    }

    useEffect(() => {
        infoUsers()
      }, []);
    
    useEffect(() => { 
    StylesProfile()
    }, [infoUsers]);
  return (
    <nav className="navbar navbar-expand-md fondoNavbar fs-5 p-3">
    <div className="container-fluid justify-content-between">
        <Profile image={imageProfile} nickname={state.Nickname} rol={state.Rol} />
        <button className="navbar-toggler custom-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav mt-3 mt-md-0">
            {
                listMenu.map(item=><li key={item.id} className="nav-item d-flex justify-content-center">
                    <button onClick={item.functionE} className="nav-link">{item.titulo}</button>
                </li>)
            }
                {/* <li className="nav-item d-flex justify-content-center">
                    <button onClick={infoUsers} className="nav-link">Todas</button>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <button onClick={getAssign} className="nav-link">Asignadas</button>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <button onClick={getSolved} className="nav-link">Solucionadas</button>
                </li> */}
                <li className="nav-item d-block d-md-none mt-5 mb-3">
                    <div className='d-flex justify-content-center' >
                        <div>
                            <ButtonLogin functionClick={salirLogout} type="button" name="Salir" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div className='containerButtonPerfil me-3 d-none d-md-flex'>
            <ButtonLogin functionClick={salirLogout} type="button" name="Salir" styles="btn btn-primary ms-3 fs-5 buttonSignup" />
        </div>

    </div>
</nav>
  )
}
