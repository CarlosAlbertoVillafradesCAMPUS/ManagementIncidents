import React from 'react'
import "../styles/LogoIncidents.css"

export default function LogoIncidents(props) {
  return (
    <>
        <img className={props.styles} src={props.image} />
    </>
  )
}
