import { useNavigate } from 'react-router-dom'

/**
 * NotFound component represents a 404 error page when the requested URL does not match any route.
 *
 * This component provides a user-friendly message indicating that the page is not found,
 * and includes a button that allows users to navigate back to the home page.
 *
 * @component
 * @example
 * <Route path="*" element={<NotFound />} />
 *
 * @returns {JSX.Element} - A styled 404 Not Found page with a message and navigation button.
 */
export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-5">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Go Back to Home
      </button>
    </div>
  )
}
