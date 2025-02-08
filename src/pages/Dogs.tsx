import { useDogIds, useDogs } from '../hooks/useDogs'
import React from 'react'
import { Option } from '../components/multiSelect/MultiSelect'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/filters/Filters'

export const Dogs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const breedsFilter = searchParams.get('breed')
  const zipCodesFilter = searchParams.get('zipCode')
  const minAgeFilter = searchParams.get('ageMin')
  const maxAgeFilter = searchParams.get('ageMax')
  const dogIds = useDogIds(
    breedsFilter ?? undefined,
    zipCodesFilter ?? undefined,
    minAgeFilter ?? undefined,
    maxAgeFilter ?? undefined,
  )
  const dogs = useDogs(dogIds?.data?.resultIds ?? [])

  const handleFilterChange = (selected: Option[], paramKey: string) => {
    setSearchParams((prevParams) => {
      if (selected === null) {
        prevParams.delete(paramKey)
      } else {
        const selectedValues = selected.map((breedOption) => breedOption.value).join(',')
        prevParams.set(paramKey, selectedValues)
      }
      return prevParams
    })
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filters (Left Side) */}
        <div className="col-md-4">
          <Filters handleFilterChange={handleFilterChange} />
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
