import React from 'react'
import "../styles/ButtonLogin.css"

export default function ButtonLogin(props) {
  return (
    <>
        <button type={props.type} onClick={props.functionClick}  className={props.styles}>{props.name}</button>
    </>
  )
}
