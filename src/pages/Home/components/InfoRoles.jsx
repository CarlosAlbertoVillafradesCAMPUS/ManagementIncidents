import React from 'react'
import "../styles/InfoRoles.css";

export default function InfoRoles(props) {
    return (
        <div className='col-12'>
            <div className='row'>
                <div className='col-6 d-flex justify-content-center mb-4'>
                    <div className={props.image}></div>
                </div>
                <div className='col-6 textInfoRol'>
                <div>
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
