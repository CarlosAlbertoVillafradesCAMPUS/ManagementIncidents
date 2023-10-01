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



function App() {

   const [activateLogin, setActivateLogin] = useState(true)
  const [activatePages, setActivatePages] = useState(false)
  const locationRoute = useLocation()

  const activate = () =>{
    const infoLocalStorage = localStorage.getItem("token")
    if (infoLocalStorage) {
      setActivateLogin(false)
      setActivatePages(true)
    }else{
      setActivateLogin(true)
      setActivatePages(false)
    }
  }

  useEffect(() => {
    activate();
  }, [locationRoute]);

  return (
    <BrowserRouter>
      <Routes>
      <Route element={<ProtectedRoute canActivate={activateLogin} redirectPath="/camper" />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute canActivate={activatePages} redirectPath="/" />}>
        <Route path='/camper' element={<Camper />} />
        <Route path='/trainer' element={<Trainer />} />
        <Route path='/support' element={<Support />} />
      </Route>
      <Route element={<ProtectedRoute canActivate={false} redirectPath="/" />}>
        <Route path="*" element={<Home />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
