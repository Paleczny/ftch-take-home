import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useFetcher } from './useFetcher'
import { UseFetcherReturnProps } from '../types/UseFetcher.types'

export const useAuth = (values: any): [() => void, boolean, any] => {
  const context = useContext(AuthContext)

  const { loading, result, fetchApi }: UseFetcherReturnProps<null> = useFetcher({
    method: 'POST',
    url: 'https://frontend-take-home-service.fetch.com/auth/login',
    body: JSON.stringify(values),
  })
  const login = () => {
    fetchApi()
  }

  useEffect(() => {
    context?.login(result ?? false)
  }, [result])

  return [login, loading, result]
}
