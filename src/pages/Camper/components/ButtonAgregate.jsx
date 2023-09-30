import React from 'react'
import "../styles/ButtonAgregate.css"

export default function ButtonAgregate({show, setShow}) {
  return (
    <button 
    className='CreateTodoButton'
    type='button'
    onClick={()=>setShow(!show)}>+</button>
  )
}
