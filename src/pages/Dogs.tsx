import { getMatchID, useDogIds, useDogs } from '../hooks/useDogs'
import React, { useState } from 'react'
import { Option } from '../components/multiSelect/MultiSelect'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/filters/Filters'
import Pagination from '../components/pagination/Pagination'
import { DogMatch } from '../types/Dog.types'

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
  const [favorites, setFavorites] = useState<string[]>()
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

  const handleOnFavorite = (dogId: string) => {
    setFavorites((prev) => {
      if (prev?.includes(dogId)) {
        return prev.filter((dId) => dId !== dogId)
      } else {
        return prev ? [...prev, dogId] : [dogId]
      }
    })
  }

  const getMatch = () => {
    getMatchID(favorites ?? []).then((matchedId: DogMatch) => setMatchId(matchedId.match))
  }

  console.log('favorites: ', favorites)

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
          <div className="row">
            {dogs?.data?.length === 0 ? (
              <p className="text-muted">No results found. Try adjusting filters.</p>
            ) : (
              dogs?.data?.map((result, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="card p-3 shadow-sm">
                    <h6 className="mb-1">{result.name}</h6>
                    <img src={result.img} alt={''} style={{ width: '100px' }}></img>
                    <span>{result.zip_code}</span>
                    <span>{result.age}</span>
                    <span>{result.breed}</span>
                    <div>
                      <input
                        className="form-check-input"
                        checked={favorites?.includes(result.id)}
                        onClick={() => handleOnFavorite(result.id)}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Favorite
                      </label>
                    </div>
                    <button className="btn btn-outline-primary btn-sm mt-2">View Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
