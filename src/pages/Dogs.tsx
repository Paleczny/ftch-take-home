import { getMatchID, useDogIds, useDogs } from '../hooks/useDogs'
import React, { useState } from 'react'
import { Option } from '../components/multiSelect/MultiSelect'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/filters/Filters'
import Pagination from '../components/pagination/Pagination'
import { DogMatch } from '../types/Dog.types'
import DogList from '../components/dogList/DogList'
import { useFavorites } from '../contexts/FavoritesContext'

export const Dogs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const breedsFilter = searchParams.get('breed')
  const zipCodesFilter = searchParams.get('zipCode')
  const minAgeFilter = searchParams.get('ageMin')
  const maxAgeFilter = searchParams.get('ageMax')
  const sortFilter = searchParams.get('sort')
  const [paginatedURL, setPaginatedURL] = useState<string | undefined>(undefined)
  const dogIds = useDogIds(
    sortFilter ?? 'breed:asc',
    breedsFilter ?? undefined,
    zipCodesFilter ?? undefined,
    minAgeFilter ?? undefined,
    maxAgeFilter ?? undefined,
    paginatedURL,
  )
  const dogs = useDogs(dogIds?.data?.resultIds ?? [])
  const { favoriteIds } = useFavorites()
  const [matchID, setMatchId] = useState<string>()
  const matchedDog = useDogs([matchID ?? ''])

  const handleFilterChange = (selected: Option[], paramKey: string) => {
    setSearchParams((prevParams) => {
      if (selected === null) {
        prevParams.delete(paramKey)
      } else {
        const selectedValues = selected.map((breedOption) => breedOption.value).join(',')
        prevParams.set(paramKey, selectedValues)
      }
      setPaginatedURL(undefined)
      return prevParams
    })
  }

  const getMatch = () => {
    getMatchID(Array.from(favoriteIds) ?? []).then((matchedId: DogMatch) => setMatchId(matchedId.match))
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filters (Left Side) */}
        <div className="col-md-4">
          <Filters handleFilterChange={handleFilterChange} />
          <button className="btn-primary" onClick={getMatch}>
            Get Match
          </button>
          {matchedDog?.data?.at(0)?.name && (
            <div className="card p-3 shadow-sm">
              <h6 className="mb-1">match</h6>
              <img src={matchedDog.data?.at(0)?.img} alt={''} style={{ width: '100px' }}></img>
              <span>{matchedDog.data?.at(0)?.name}</span>
              <span>{matchedDog.data?.at(0)?.zip_code}</span>
            </div>
          )}
          <Pagination
            totalNumberOfResults={dogIds?.data?.total}
            prevURL={dogIds?.data?.prev}
            nextURL={dogIds?.data?.next}
            handlePaginationClick={setPaginatedURL}
          />
        </div>

        {/* Results (Right Side) */}
        <div className="col-md-8">
          <DogList dogs={dogs.data ?? []} />
        </div>
      </div>
    </div>
  )
}
