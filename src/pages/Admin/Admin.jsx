import React, { useEffect, useState } from 'react'
import HeaderSupport from '../Support/components/HeaderSupport'
import ContainerCampers from '../Trainer/containers/ContainerCampers'
import ContainerSalones from './container/ContainerSalones'
import ListCamper from '../Trainer/components/ListCamper'
import useAdmin from './hook/useAdmin'
import CardSalones from './components/CardSalones'
import ModalSalones from './components/ModalSalones'
import ModalAgregateInventario from './components/ModalAgregateInventario'
import ModalInventario from './components/ModalInventario'


export default function Admin() {
    const {
        stateAdmin,
    setStateAdmin,
    infoAdmin,
    listUsers,
    setListUsers,
    searchUsers,
    textSearch,
    setTextSearch,
    listSalones,
    GetSalones
    } = useAdmin()

    const [showSalones, setShowSalones] = useState(true)
    const [showInventario, setShowInventario] = useState(false)
    const [showModalSalones, setShowModalSalones] = useState(false)
    const [showModalInventory, setShowModalInventory] = useState(false)

    const[zona, setZona] = useState("")

    const handleShowInventario = () =>{
      setShowInventario(false)
      setShowInventario(true)
    }

    const handleShowSalones = () =>{
      setShowInventario(false)
      setShowSalones(true)
    }

    const handleShowModalSalones = () =>{
      setShowModalSalones(true)
    }

    const menu = [
        {
            id:0,
            titulo:"Salones",
            functionE: handleShowSalones
        }
    ]

    

    let number = 0;

    useEffect(() => {
        infoAdmin();
      }, []);

      useEffect(() => {
        GetSalones();
      }, [showSalones]);

      useEffect(() => {
        GetSalones();
      }, [showModalSalones]);

  return (
    <>
    <div className="containerPrincipalCamper">
      <div className="sombra">
        <HeaderSupport
          infoUsers={infoAdmin}
          listMenu={menu}
          state={stateAdmin}
          setState={setStateAdmin}
        />
        <div className="row containerTrainer">
          <div className="col-12 col-md-3 containerList">
            <ContainerCampers
              rol={stateAdmin.Rol}
              textSearch={textSearch}
              setTextSearch={setTextSearch}
              searchCampers={searchUsers}
            >
              {listUsers.map((item) => (
                <ListCamper
                  key={number++}
                  Nit={item.Nit}
                  name={item.Nickname}
                  Role={item.Role}
                  setIncidencias={""}
                />
              ))}
            </ContainerCampers>
          </div>
          <div className="col-12 col-md-9">
          {showSalones && (
            <ContainerSalones functionC={handleShowModalSalones}>
              {listSalones.map(item=><CardSalones key={item.ID} info={item} setShowInventario={setShowInventario} setShowModalInventory={setShowModalInventory} setZona={setZona} />)}
            </ContainerSalones>
          )}
          </div>
        </div>
      </div>
    </div>
    {showModalSalones && (
      <ModalSalones
        showModalSalones={showModalSalones}
        setShowModalSalones={setShowModalSalones}
      />
    )}
    {showModalInventory && (
      <ModalAgregateInventario
      zona={zona}
        showModalInventory={showModalInventory}
        setShowModalInventory={setShowModalInventory}
      />
    )}
    {showInventario && (
      <ModalInventario
        zona={zona}
        showInventario={showInventario}
        setShowInventario={setShowInventario}
      />
    )}
  </>
  )
}
