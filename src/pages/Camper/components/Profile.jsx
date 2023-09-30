import React from 'react'
import "../styles/Profile.css"

export default function Profile() {
  return (
      <div className='profile d-flex'>
          <div className='imageProfile'></div>
          <div className='ms-2'>
          <p className='nicknameProfile'>VILLAFRADES</p>
          <p className='rolProfile'>Camper</p>
          </div>
      </div>
  )
}
