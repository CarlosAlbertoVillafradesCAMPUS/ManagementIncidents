import React, { useEffect, useState } from 'react'
import "../styles/ListCamper.css"

export default function ListCamper(props) {
  const [imageUser, setImageUsers] = useState("")

  useEffect(() => {
    if (props.Role == "Camper") {
      setImageUsers("imageUsersCampers")
    }else{
      setImageUsers("imageUsersTrainers")
    }
  }, []);

  return (
    <>
        <li className="list-group-item bg-transparent">
            <div className='d-flex'>
                <div className={imageUser}></div>
                <div className='centerNameCamper'>
                <p className='fw-bold textNickname'>{props.name}</p>
                <p className='text-white'>{props.Role}</p>
                </div>
            </div>
        </li>
    </>
  )
}
