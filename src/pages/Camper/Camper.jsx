import React from 'react'
import HeaderCamper from './components/HeaderCamper'
import ContainerInsidencias from './containers/ContainerInsidencias'
import "./styles/Camper.css"

export default function Camper() {
  return (
    <div>
      <HeaderCamper />
      <div>
        <ContainerInsidencias>

        </ContainerInsidencias>
      </div>
    </div>
  )
}
