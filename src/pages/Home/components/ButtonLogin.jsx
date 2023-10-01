import React from 'react'
import "../styles/ButtonLogin.css"

export default function ButtonLogin(props) {
  return (
    <>
        <button type="button" className={props.styles}>{props.name}</button>
    </>
  )
}
