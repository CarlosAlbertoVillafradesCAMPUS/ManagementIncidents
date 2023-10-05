import React from 'react'
import Titulos from '../../Home/components/Titulos'
import ButtonLogin from '../../Home/components/ButtonLogin'

export default function ContainerSalones({functionC, children}) {
  return (
    <div>
    <div className='d-flex flex-column justify-content-center'>
      <div className='d-flex containerBienvenida mt-3 mb-3'>
        <Titulos name="Registro Salones" />
      </div>
      <div className='container jajaja'>
      <div className='d-flex justify-content-center'>
      <ButtonLogin name="Agregar Salon" functionClick={functionC} type="button" styles="btn btn-primary ms-2 fs-6 buttonSignup" />
      </div>
      <div className='row gy-3 justify-content-center containerlistCardsIncidents'>
        {children}
      </div>
      </div>
     
    </div>
  </div>
  )
}
