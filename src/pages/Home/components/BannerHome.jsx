import React from 'react'
import textBanner from "../assets/images/BannerIncidents-removebg-preview.png"
import "../styles/BannerHome.css"

export default function BannerHome() {
  return (
    <>
    <div className='BannerHome'>
   <img className='animate__animated animate__pulse animate__slow animate__infinite tituloBanner' src={textBanner} />
   </div>
   
    </>
   
  )
}
