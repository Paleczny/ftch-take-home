export interface UseFetcherReturnProps<T> {
  loading: boolean
  result: T | null | boolean
  fetchApi: () => Promise<void>
}

export interface UseFetcherProps {
  method: 'POST' | 'GET'
  url: string
  body?: BodyInit
}
