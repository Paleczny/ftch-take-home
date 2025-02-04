import { Outlet } from 'react-router-dom'
import React from 'react'
import { Header, Footer } from './'

/**
 * Layout component that wraps around the main content of the application.
 *
 * The Layout component serves as a template for pages, providing consistent structure with a header, main content area, and footer.
 * The `<Outlet />` component is used to render child routes defined in the router configuration.
 *
 * @component
 * @example
 * // Usage in a router setup
 * <Route path="/" element={<Layout />}>
 *   <Route path="home" element={<HomePage />} />
 *   <Route path="about" element={<AboutPage />} />
 * </Route>
 *
 * @returns {JSX.Element} - The layout structure with a header, a main content area, and a footer.
 */
const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light bg-opacity-25 p-4">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
