import React from 'react'
import ButtonLogin from '../../Home/components/ButtonLogin'
import "../styles/ModalIncident.css"
import Titulos from '../../Home/components/Titulos'

export default function ModalIncident({show, setShow}) {
    return (
        <div className="ModalBackground">
            <form className='agregateIncidents p-5'>
            <Titulos name="Reportar Incidencia" />
                <div className='row fs-5'>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Tipo de incidencia:</label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="po">Tipo de incidencia</option>
                            <option value="1">Material</option>
                            <option value="2">Digital</option>
                        </select>                    </div>
                    <div className=" col-12 col-md-6 mb-3">
                        <label className="form-label">Zona:</label>
                        <input type="text" className="form-control" placeholder='Nombre' />
                    </div>
                    <div className=" col-12 col-md-12 mb-3 d-flex justify-content-center">
                    <div className='w-75'>
                        <label className="form-label">Inventario:</label>
                        <input type="text" className="form-control" placeholder='Apodo' />
                    </div>
                    </div>
                    <div className=" col-12 mb-3">
                        <label className="form-label">Describe la incidencia:</label>
                        <textarea className="form-control" rows="3"></textarea>                    </div>
                    <div className='col-12 containerLoginHeader mt-4'>
                        <ButtonLogin name="Agregar" styles="btn btn-primary ms-2 fs-6 buttonSignup"/>
                        <button className='btn btn-primary' onClick={()=>setShow(!show)} >Cerrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
