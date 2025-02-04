import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const auth = { token: false }

  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
