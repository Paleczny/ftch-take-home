import useSWR from 'swr'
import { DogId } from '../types/DogId.types'
import { Dog } from '../types/Dog.types'
import { useEffect, useState } from 'react'

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
export const useDogIds = (breeds?: string, zipCodes?: string, minAge?: string, maxAge?: string) => {
  const [debouncedBreeds, setDebouncedBreeds] = useState(breeds)
  const [debouncedZipCodes, setDebouncedZipCodes] = useState(zipCodes)
  const [debouncedMinAge, setDebouncedMinAge] = useState(minAge)
  const [debouncedMaxAge, setDebouncedMaxAge] = useState(maxAge)

  // Debounce function to delay updating the state
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBreeds(breeds)
      setDebouncedZipCodes(zipCodes)
      setDebouncedMinAge(minAge)
      setDebouncedMaxAge(maxAge)
    }, 500)

    return () => clearTimeout(handler)
  }, [breeds, zipCodes, minAge, maxAge])

  // Construct Query Parameters
  const breedsArray = debouncedBreeds ? debouncedBreeds.split(',').map((breed) => ['breeds', breed]) : []
  const zipCodesArray = debouncedZipCodes ? debouncedZipCodes.split(',').map((zipCode) => ['zipCodes', zipCode]) : []
  const min = debouncedMinAge ? [['ageMin', debouncedMinAge]] : []
  const max = debouncedMaxAge ? [['ageMax', debouncedMaxAge]] : []
  const queryParam = new URLSearchParams([...breedsArray, ...zipCodesArray, ...min, ...max])
  const url = new URL('https://frontend-take-home-service.fetch.com/dogs/search')
  url.search = queryParam.toString()

  return useSWR<DogId, Error>(
    { url: url.toString(), method: 'GET' },
    ({ url, method }: DogFetcherType) => dogFetcher(url, method),
    { revalidateOnFocus: false, dedupingInterval: 50000 },
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
