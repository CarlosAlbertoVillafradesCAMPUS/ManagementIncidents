import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Camper from '../pages/Camper/Camper'
import Trainer from '../pages/Trainer/Trainer'
import Support from '../pages/Support/Support'
import ProtectedRoute from '../utils/ProtectedRoute'
import { useLocation } from 'react-use'
import useApp from './hook/useApp'



function App() {

  const {stateRoutes,
    setStateRoutes} = useApp();

  /*  const locationRoute = useLocation()

    const activate = () => {
      const infoLocalStorage = localStorage.getItem("VITE_AUTH_TOKEN")
      if (infoLocalStorage) {
        console.log(stateRoutes);
      } else {
        console.log(stateRoutes);
      }
    }

    useEffect(() => {
      activate();
    }, [locationRoute]); */

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Login} redirectPath={"/"} />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login  />} />
          <Route path='/signUp' element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Camper} redirectPath={"/"} />}>
          <Route path='/camper' element={<Camper />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Trainer} redirectPath={"/"} />}>
          <Route path='/trainer' element={<Trainer />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Support} redirectPath={"/"} />}>
          <Route path='/support' element={<Support />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={false} redirectPath={"/"} />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
