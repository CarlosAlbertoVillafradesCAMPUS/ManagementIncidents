import React from 'react'
import textBanner from "../../Home/assets/images/BannerIncidents-removebg-preview.png"

export default function EmptyIncidencias() {
  return (
    <div className="col-12 pageInicio">
      <div className="containerInicio">
        <div className="containerImageInicio">
          <img src={textBanner} className="logoTextBanner lotexBann" />
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex textCon">
            <p className="fs-6 text-center text-white">
              No tienes reportes de incidencias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
