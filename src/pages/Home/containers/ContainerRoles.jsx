import React from 'react'
import "../styles/ContainerRoles.css"

export default function ContainerRoles({children}) {
  return (
    <div className='fondoInfoRoles'>
        <div className='container contenedorInfoRoles pt-3'>
        <h2 className='text-center'>Tipos de Usuarios</h2>
        <div className='row'>
        {children}
        </div>
    </div>
    </div>
    
  )
}
