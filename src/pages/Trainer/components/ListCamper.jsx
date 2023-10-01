import React from 'react'
import "../styles/ListCamper.css"

export default function ListCamper(props) {
  return (
    <>
        <li className="list-group-item bg-transparent">
            <div className='d-flex'>
                <div className='imageCampers'></div>
                <div className='centerNameCamper'>
                <p className='fw-bold textNickname'>{props.name}</p>
                <p className='text-white'>Camper</p>
                </div>
            </div>
        </li>
    </>
  )
}
