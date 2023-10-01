import React from 'react'
import imageTitulo from "../../Home/assets/images/BannerIncidents-removebg-preview.png";
import "../styles/BannerLogin.css"
import ButtonLogin from '../../Home/components/ButtonLogin';

export default function BannerLogin() {
  return (
    <div className='col-md-8 d-none d-md-flex justify-content-center BannerLogin'>
      <div>
        <div className='d-flex justify-content-center'>
          <img className='w-75' src={imageTitulo} />
        </div>
        <div className='containerLoginHeader'>
        <ButtonLogin  styles="btn btn-primary ms-2 fs-6 h-50 buttonSignup" name="Volver al home" />
        </div>
      </div>
    </div>
  )
}
