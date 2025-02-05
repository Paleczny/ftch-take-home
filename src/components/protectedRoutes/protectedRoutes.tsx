import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const ProtectedRoutes = () => {
  const context = useContext(AuthContext)
  console.log('context?.authenticated: ', context?.authenticated)

  return context?.authenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
