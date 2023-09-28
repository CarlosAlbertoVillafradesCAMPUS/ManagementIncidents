import React from 'react'
import "../styles/InfoRoles.css";

export default function InfoRoles(props) {
    return (
        <div className='col-6 p-0'>
            <div className='row mb-4'>
                <div className='col-6 d-flex justify-content-center p-0 mb-4'>
                    <div className={props.image}></div>
                </div>
                <div className='col-6 p-0 textInfoRol'>
                <div>
                <h2 className='titulos subtit_usu'>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
