import { useForm } from '../hooks/useForm'
import { UseFormReturnProps } from '../types/UseForm.types'
import { LoginTypes } from '../types/Login.types'

const Login = () => {
  const { values, handleFormChanges }: UseFormReturnProps<LoginTypes> = useForm({
    initialFormValues: {
      name: '',
      email: '',
    },
  })

  function handleSubmit(e: any) {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleFormChanges} type="text" placeholder="Name" value={values.name} />
        <input
          name="email"
          onChange={handleFormChanges}
          type="email"
          placeholder="Email address"
          value={values.email}
        />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login
