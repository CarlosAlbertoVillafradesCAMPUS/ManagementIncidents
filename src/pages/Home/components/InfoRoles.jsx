import React from 'react'
import "../styles/InfoRoles.css";

export default function InfoRoles(props) {
    return (
        <div className='col-12 col-md-6 p-0'>
            <div className='row gx-3 mb-4'>
                <div className='col-12 col-md-4 d-flex justify-content-end containerImageRole mb-4'>
                    <div className={props.image}></div>
                </div>
                <div className='col-12 col-md-8 p-0 textInfoRol'>
                <div className='withText'>
                <h2 className='titulos subtit_usu'>{props.title}</h2>
                    <p className='descriptionSubtit_usu'>{props.description}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
