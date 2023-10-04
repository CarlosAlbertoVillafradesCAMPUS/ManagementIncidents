import React, { useEffect } from 'react'
import HeaderCamper from '../Camper/components/HeaderCamper'
import ContainerCampers from './containers/ContainerCampers'
import Insidencias from '../Camper/components/Insidencias'
import ContainerInsidencias from '../Camper/containers/ContainerInsidencias'
import "./styles/Trainer.css"
import ListCamper from './components/ListCamper'
import useTrainer from './hook/useTrainer'

export default function Trainer() {


  const {
      stateTrainer,
        setStateTrainer,
        infoTrainer,
        incidencias,
        listCamper,
        GetPending,
        GetSolved,
        GetAssign
  } = useTrainer()

      useEffect(() => {
        infoTrainer()
      }, []);

      
  return (
    <>
    <div className='containerPrincipalCamper'>
      <div className='sombra'>
        <HeaderCamper infoUsers={infoTrainer} getAssign={GetAssign} getPending={GetPending} getSolved={GetSolved} state={stateTrainer} setState={setStateTrainer} />
        <div className='row containerTrainer'>
            <div className='col-12 col-md-3 containerList'>
            <ContainerCampers>
            {listCamper?.map(item=><ListCamper key={item._id} id={item.nit} name={item.Nickname} Role={item.Role} />)}
            </ContainerCampers>
            </div>
            <div className='col-12 col-md-9'>
            <ContainerInsidencias nickname={stateTrainer.Nickname}>
                {incidencias.map(item => <Insidencias key={item.ID} camper={item.By_Camper} id={item.ID} info={item} infoUser={stateTrainer}  whidCard="col-12 col-md-12 col-lg-6" />)}
            </ContainerInsidencias>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
