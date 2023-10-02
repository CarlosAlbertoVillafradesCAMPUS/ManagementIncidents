import React from 'react'
import textBanner from "../assets/images/BannerIncidents-removebg-preview.png"
import planeta from "../assets/images/planetaTecgnologico.png"
import "../styles/BannerHome.css"

export default function BannerHome() {
  return (
    <>
    <div className='fondoBannerHome'>
    <div className='BannerHome'>
          <div className="row">
            <div className='col-12 col-md-6 containerTituloBannerHome '>
            <div>
            <img className=' tituloBanner' src={textBanner} />
            </div>
            </div>
            <div className='col-12 col-md-6 containerPlanet'>
            <div className='containerTituloBanner'>
              <img className=' animate__animated animate__pulse animate__slow animate__infinite planeta ' src={planeta} /> 
            </div>
            </div>
          </div>
        </div>
    </div>
        
    </>

  )
}
