import React from 'react'
import {faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Footer.css"
import { Link } from 'react-router-dom';

export default function Footer() {
  const redes=[
    {
      id:0,
      image:faLinkedin,
      href: "https://www.linkedin.com/in/carlos-villafrades-426310237"
    },
    {
      id:1,
      image:faGithub,
      href: "https://github.com/CarlosAlbertoVillafradesCAMPUS"
    },
    {
      id:2,
      image:faInstagram,
      href: "https://www.instagram.com/carlos_villafradess/"
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
                redes.map(item=><Link to={item.href}><FontAwesomeIcon className='iconRedes me-3' key={item.id} icon={item.image} /></Link> )
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
