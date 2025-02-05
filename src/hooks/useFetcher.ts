import { useState } from 'react'
import { UseFetcherProps, UseFetcherReturnProps } from '../types/UseFetcher.types'

/**
 * Custom hook to fetch data from an API endpoint using the Fetch API.
 *
 * @template T - The type of the data expected in the response.
 * @param {UseFetcherProps} props - An object containing:
 *   - method: The HTTP method to use for the request (e.g., 'POST', 'GET').
 *   - url: The URL endpoint to which the request will be sent.
 *   - body: Optional body to send with the request (used for POST requests).
 * @returns {UseFetcherReturnProps<T>} - Returns an object containing the loading state, the result of the request, and the function to execute the fetch.
 *
 * @example
 * const { loading, result, fetchApi } = useFetcher({ method: 'POST', url: '/api/data', body: JSON.stringify({ key: 'value' }) });
 * useEffect(() => {
 *   fetchApi();
 * }, []);
 */
export const useFetcher = <T>({ method, url, body }: UseFetcherProps): UseFetcherReturnProps<T> => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<T | null | boolean>(null)

  const fetchApi = async () => {
    setLoading(true)
    const requestInit: RequestInit = {
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      credentials: 'include',
    }

    try {
      const response = await fetch(url, requestInit)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      if (method === 'GET') {
        const data = await response.json()
        setResult(data)
      } else {
        setResult(true)
      }
    } catch (error) {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return { loading, result, fetchApi }
}
