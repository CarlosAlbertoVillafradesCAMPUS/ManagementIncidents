import React from 'react'
import {faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Footer.css"

export default function Footer() {
  const redes=[
    {
      id:0,
      image:faLinkedin
    },
    {
      id:1,
      image:faGithub
    },
    {
      id:2,
      image:faInstagram
    }
  ]
  return (
    <div className='contenedorFooter pt-3 pb-3'>
      <div className='row mt-2'>
        <div className='col-12 col-md-6 contenteMyImage'>
          {/* <div className='containerTituloFooter'>
            <Titulos name="Developer" />
          </div> */}
          <div className='d-flex'>
            <div className='fondoMyImage'>
              <div className='myImage'></div>
            </div>
            <div className='d-flex flex-column justify-content-center ms-3'>
              <p className='fs-6 titulos subtit_usu titt'>Carlos Villafrades Pinilla</p>
              <p className='text-white'>Desarrollador fullStack</p>
              <div className='containerRedes mt-3'>
              {
                redes.map(item=><FontAwesomeIcon className='iconRedes me-3' key={item.id} icon={item.image} />)
              }
              </div>
            </div>
          </div>
        </div>
        <div className='col-6'>

        </div>
      </div>
    </div>
  )
}
