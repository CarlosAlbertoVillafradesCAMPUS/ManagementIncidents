import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/CardInfo.css"

export default function CardInfo(props) {
  return (
    <div className='col-4 mb-3 pe-3 ps-3'>
          <h2 className='text-center text-dark mb-3 titulos'>{props.titulo}</h2>
          <div className='w-100 d-flex justify-content-center'>
          <FontAwesomeIcon className='imageSvg' icon={props.image} />
          </div>
          <p className='text-center mt-3'>{props.description}</p>
          {/* <img className='imageSvg' src={props.image} /> */}
    </div>
  )
}
