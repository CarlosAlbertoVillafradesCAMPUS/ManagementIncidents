import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Camper from '../pages/Camper/Camper'
import Trainer from '../pages/Trainer/Trainer'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path='/camper' element={<Camper />} />
        <Route path='/trainer' element={<Trainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
