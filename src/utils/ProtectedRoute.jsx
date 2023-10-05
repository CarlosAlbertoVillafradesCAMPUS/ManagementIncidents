import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({
    canActivate,
    redirectPath = "/"
}) {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace /> //en caso de que el canActivate sea false me va a redireccionar a mi componente not found
    }
  return <Outlet /> //el Outlet me sirve para que en caso de que funcione bien me deje pasar a la ruta que necesita
}