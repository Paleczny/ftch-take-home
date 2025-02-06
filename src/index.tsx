import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/layout'
import { NotFound } from './pages/NotFound'
import Login from './pages/Login'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import { AuthProvider } from './contexts/AuthContext'
import Dogs from './pages/Dogs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/',
            element: <Dogs />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
])

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
