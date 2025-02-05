import { useForm } from '../hooks/useForm'
import { UseFormReturnProps } from '../types/UseForm.types'
import { LoginTypes } from '../types/Login.types'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const { values, handleFormChanges }: UseFormReturnProps<LoginTypes> = useForm({
    initialFormValues: {
      name: '',
      email: '',
    },
  })

  const [login, loading, result] = useAuth(values)

  function handleSubmit(e: any) {
    e.preventDefault()
    login()
  }

  useEffect(() => {
    if (result) {
      navigate('/')
    }
  }, [result])

  return (
    <div
      className="card shadow-lg rounded-4 p-4 w-100 mx-auto"
      style={{
        maxWidth: '400px',
        minHeight: '350px',
        marginTop: '50px',
      }}
    >
      {loading && <h1>loading</h1>}
      <h1 className="mb-4 text-center text-primary">Login</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          className="form-control mb-3"
          name="name"
          onChange={handleFormChanges}
          type="text"
          placeholder="Name"
          value={values.name}
        />
        <input
          className="form-control mb-3"
          name="email"
          onChange={handleFormChanges}
          type="email"
          placeholder="Email address"
          value={values.email}
        />
        <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 mt-3">
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login
