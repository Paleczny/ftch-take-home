import useSWR from 'swr'
import { DogId } from '../types/DogId.types'
import { Dog } from '../types/Dog.types'

interface DogFetcherType {
  url: string
  method: 'GET' | 'POST'
  body: string[]
}

export const dogFetcher = async (url: string, method: string, body: string[] = []) => {
  const requestInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    credentials: 'include',
  }

  const response = await fetch(url, body.length === 0 ? requestInit : { ...requestInit, body: JSON.stringify(body) })

  return response.json()
}
export const useDogIds = (breeds?: string) => {
  const breedsArray = breeds
    ? breeds.split(',').map((breed) => {
        return ['breeds', breed]
      })
    : []
  const breedsQueryParam = new URLSearchParams(breedsArray)
  const url = new URL('https://frontend-take-home-service.fetch.com/dogs/search')
  url.search = breedsQueryParam.toString()
  return useSWR<DogId, Error>(
    { url: url.toString(), method: 'GET' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method),
    { revalidateOnFocus: false },
  )
}

export const useDogs = (dogIDs: string[]) => {
  return useSWR<Dog[], Error>(
    dogIDs.length > 0 ? ['dogs', ...dogIDs] : null, // Use an array key to track dependencies
    () => dogFetcher('https://frontend-take-home-service.fetch.com/dogs', 'POST', dogIDs),
    { revalidateOnFocus: false },
  )
}

export const useDogBreeds = () => {
  return useSWR<string[], Error>(
    { url: 'https://frontend-take-home-service.fetch.com/dogs/breeds', method: 'GET' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method),
    { revalidateOnFocus: false },
  )
}
