import useSWR from 'swr'
import { DogId } from '../types/DogId.types'
import { Dog } from '../types/Dog.type'

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
  const response = await fetch(url, method === 'GET' ? requestInit : { ...requestInit, body: JSON.stringify(body) })

  return response.json()
}
export const useDogIds = () => {
  return useSWR<DogId, Error>(
    { url: 'https://frontend-take-home-service.fetch.com/dogs/search', method: 'GET' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method),
  )
}

export const useDogs = (dogIDs: string[]) => {
  return useSWR<Dog[], Error>(
    { url: 'https://frontend-take-home-service.fetch.com/dogs', method: 'POST' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method, dogIDs),
  )
}

export const useDogBreeds = () => {
  return useSWR<string[], Error>(
    { url: 'https://frontend-take-home-service.fetch.com/dogs/breeds', method: 'GET' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method),
  )
}
