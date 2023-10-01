import React from 'react'
import Titulos from './Titulos'
import "../styles/Footer.css"

export default function Footer() {
  return (
    <div className='contenedorFooter pt-3'>
      <div className='prueba'>
        <Titulos name="Developer" />
        <div className='row mt-5'>
        <div className='col-6 contenteMyImage'>
          <div className='sa'>
            
          </div>
        </div>
        <div className='col-6'></div>
        </div>
      </div>
    </div>
  )
}
