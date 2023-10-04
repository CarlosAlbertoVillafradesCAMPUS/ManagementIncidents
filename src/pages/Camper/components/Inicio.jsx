import React from 'react'
import textBanner from "../../Home/assets/images/BannerIncidents-removebg-preview.png"
import "../styles/Inicio.css"

export default function Inicio({setShow}) {
  return (
    <div className='col-12 pageInicio'>
        <div className='containerInicio'>
            <div className='containerImageInicio'>
                <img src={textBanner} className='logoTextBanner lotexBann' />
            </div>            
            <div className="d-flex justify-content-center">
                <div className='d-flex textCon'>
                    <p className='noReporte text-center text-white'>No tienes reportes de incidencias, AGREGAR</p>
                </div>
                <button type='button' onClick={()=>setShow(true)} className=' ms-2 buttonEmpty'>+</button>
            </div>
        </div>
    </div>
  )
}

{/* <div className='img-empty'>
            <img src={libreta} alt="libreta" />
        </div>
        <div className='container-text'>
            <p className='vamos'>VAMOS</p>
            <p>Crea tu lista de TO DO's, oprimiendo.</p>
        </div>
        <button 
            className='ButtonEmpty'
            type='button'
            placeholder='Buscar'
            onClick={() => props.setOpenForm(!props.openForm)}>+</button> */}