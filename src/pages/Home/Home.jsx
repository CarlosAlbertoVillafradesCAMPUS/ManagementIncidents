import React from 'react'
import HeaderHome from './components/HeaderHome'
import BannerHome from './components/BannerHome'
import InfoProyect from './components/InfoProyect'
import ContainerRoles from './containers/ContainerRoles'
import InfoRoles from './components/InfoRoles'
import Footer from './components/Footer'
// import imagePrueba from "./assets/images/BannerIncidents-removebg-preview.png"
// import imageCamper from "./assets/images/camper.jpg"
// import imageTrainer from "./assets/images/trainer.jpg"
import "./styles/Home.css"

export default function Home() {

    const infoComponenteRoles = [
        {
            id:0,
            titulo:"Camper",
            image:"imageCamper",
            description:"El usuario con Rol de Camper podra reportar incidencias, identificado el lugar en que fue realizada, el tipo de insidencia y la descripcion especifica de la misma. Ademas tambien podra revisar registro de sus insidencias reportadas y filtrarlas"
        },
        {
            id:1,
            titulo:"Trainer",
            image:"imageTrainer",
            description:"El usuario con Rol de Trainer podra revisar las ultimas insidencias reportadas por todos lo campers, ademas de poder calificar la gravedas de las insidencias reportadas y asignar una persona de apoyo que se encargue de solucionar el problema"
        },
        {
            id:2,
            titulo:"Support",
            image:"imageCamper",
            description:"El usuario con Rol de Support podra revisar las insidencias que le han asignado, empezando por las de gravedad mas alta, ademas podra marcar las insidecnias una vez las haya solucionado"
        },
        {
            id:3,
            titulo:"Admin",
            image:"imageTrainer",
            description:"El usuario con Rol de Admin estara en la capacidad de tener control de la pagina, podra asignar roles acada uno de los usuarios, ya que todo usuarios registrado, se registrara con el rol de camper. tambien podra revisar todas las insidencias que se han reportado, cuales estan asignadas y cuales solcionadas, ademas de poder agregar nuevos salones o zonas de campues y agregar inventario a cada uno de estos salones"
        }
    ]

  return (
    <div className='containerPrincipalHome'>
    <HeaderHome />
    <BannerHome />
    <InfoProyect />
    <ContainerRoles>
    {infoComponenteRoles.map(rol=> <InfoRoles key={rol.id} title={rol.titulo} image={rol.image} description={rol.description} />)}
    </ContainerRoles>
    <Footer />
    </div>
        
  )
}
