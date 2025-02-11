import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/layout'
import { NotFound } from './pages/NotFound'
import Login from './pages/Login'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { FavoritesProvider } from './contexts/FavoritesContext'

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
            async lazy() {
              const { Dogs } = await import('./pages/Dogs')
              return { Component: Dogs }
            },
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
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
