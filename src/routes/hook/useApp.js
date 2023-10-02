import React, { useState } from "react";

const useApp = () => {
    const [stateRoutes, setStateRoutes] = useState({
        Login:true,
        Camper:false,
        Trainer: false,
        Support: false
      })

    return{
        stateRoutes,
        setStateRoutes
    }
}

export default useApp