import React from 'react'
import Titulos from '../components/Titulos'
import "../styles/ContainerRoles.css"

export default function ContainerRoles({children}) {
  return (
    <div className='fondoInfoRoles'>
        <div className='contenedorInfoRoles pt-3'>
        <div className='prueba'>
        <Titulos name="Tipos de Usuarios" />
        <div className='row mt-3 mt-md-5 pe-md-5 mb-5'>
        {children}
        </div>
        </div>
    </div>
    </div>
    
  )
}
