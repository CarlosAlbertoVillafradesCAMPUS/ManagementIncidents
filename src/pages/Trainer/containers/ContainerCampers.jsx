import React, { useEffect } from 'react'
import "../styles/ContainerCampers.css"

export default function ContainerCampers({textSearch, setTextSearch, searchCampers, children }) {

     useEffect(() => {
       searchCampers();
     }, [textSearch]);
    return (
        <div>
            <div className='d-flex flex-column justify-content-center'>
                <div className='d-flex justify-content-center mt-3 mb-3'>
                    <p className='mt-2 fs-5 ms-2 tituloListCamper'>Lista Campers</p>
                </div>
                <div className=' mb-4 d-flex justify-content-center'>
                <div className="form-outline w-75">
                    <input type="search" id="form1" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)} placeholder='Search Camper' className="form-control" />
                </div>
                </div>
                <div>
                    <ul className='list-group list-group-flush'>
                        {children}
                    </ul>
                </div>
            </div>
        </div>
    )
}
