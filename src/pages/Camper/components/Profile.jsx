import React from 'react'
import "../styles/Profile.css"

export default function Profile(props) {
  return (
      <div className='profile d-flex'>
          <div className='imageProfile'></div>
          <div className='ms-2 text-white'>
          <p className='nicknameProfile'>{props.nickname}</p>
          <p className='rolProfile'>{props.rol}</p>
          </div>
      </div>
  )
}
