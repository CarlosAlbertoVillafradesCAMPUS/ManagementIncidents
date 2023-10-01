import React from 'react'

export default function InfoCards(props) {
  return (
    <div className='d-flex'>
    <p className="card-text titleInfo">{props.title}</p>
    <p className="card-text ms-1">{props.info}</p>
  </div>
  )
}
