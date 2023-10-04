import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Camper from '../pages/Camper/Camper'
import Trainer from '../pages/Trainer/Trainer'
import Support from '../pages/Support/Support'
import ProtectedRoute from '../utils/ProtectedRoute'
import { useLocation } from 'react-use'
import useApp from './hook/useApp'
import useLogin from '../pages/Login/hook/useLogin'



function App() {

  const { stateRoutes,
    setStateRoutes } = useApp();
  const locationRoute = useLocation()

  const activate = async () => {
    const infoLocalStorage = localStorage.getItem("VITE_AUTH_TOKEN")
    if (infoLocalStorage) {
      const Rol = localStorage.getItem("Rol")
      switch (Rol) {
        case "Camper":
          setStateRoutes({
            Login: false,
            Camper: true,
            Trainer: false,
            Support: false
          })
          break;
        case "Trainer":
          setStateRoutes({
            Login: false,
            Camper: false,
            Trainer: true,
            Support: false
          })
          break;
        case "Support":
          setStateRoutes({
            Login: false,
            Camper: false,
            Trainer: false,
            Support: true
          })
          break;

        default:
          break;
      }
    } else {
      setStateRoutes({
        ...stateRoutes,
        Login: true,
        Camper: false,
        Trainer: false,
        Support: false
      })
    }
  }

  useEffect(() => {
    activate();
  }, [locationRoute]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Login} redirectPath={"/camper"} />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Camper} redirectPath={"/trainer"} />}>
          <Route path='/camper' element={<Camper />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Trainer} redirectPath={"/support"} />}>
          <Route path='/trainer' element={<Trainer />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={stateRoutes.Support} redirectPath={"/"} />}>
          <Route path='/support' element={<Support />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={false} redirectPath={"/login"} />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
