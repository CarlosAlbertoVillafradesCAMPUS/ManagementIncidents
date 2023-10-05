import React from 'react'
import Titulos from "../../Home/components/Titulos";
import "../styles/ContainerInsidencias.css"

export default function ContainerInsidencias({nickname, children }) {
  
  return (
    <div>
      <div className='d-flex flex-column justify-content-center'>
        <div className='d-flex containerBienvenida mt-3 mb-3'>
          <Titulos name="Bienvenido" />
          <p className='m-0 ms-2 fs-1 text-white'>{nickname}</p>
        </div>
        <div className='container jajaja'>
        <div className='row gy-3 justify-content-center containerlistCardsIncidents'>
          {children}
        </div>
        </div>
       
      </div>
    </div>
  )
}
