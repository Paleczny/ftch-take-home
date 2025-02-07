import { useDogBreeds, useDogIds, useDogs } from '../hooks/useDogs'
import React, { useState } from 'react'
import MultipleSelect, { Option } from '../components/multiSelect/MultiSelect'
import { useSearchParams } from 'react-router-dom'

export const Dogs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const breedsFilter = searchParams.get('breed')
  const zipCodesFilter = searchParams.get('zipCode')
  const dogIds = useDogIds(breedsFilter ?? undefined, zipCodesFilter ?? undefined)
  const dogs = useDogs(dogIds?.data?.resultIds ?? [])
  const dogBreeds = useDogBreeds()
  const dogBreedOptions: Option[] | undefined = dogBreeds?.data?.map((breed) => {
    return { label: breed, value: breed }
  })

  const [zipCodes, setZipCodes] = useState<Option[]>([])
  const [selectedZipCodes, setSelectedZipCodes] = useState<Option[]>()

  const [selectedDogBreeds, setSelectedDogBreeds] = useState<Option[]>([])

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

  const handleDogBreedChange = (selected: Option[], paramKey: string) => {
    handleFilterChange(selected, paramKey)
    setSelectedDogBreeds(selected)
  }

  const handleZipCodeChange = (selected: Option[], paramKey: string) => {
    handleFilterChange(selected, paramKey)
    setSelectedZipCodes(selected)
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filters (Left Side) */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            {/* Breed Filter */}
            <div className="mb-3">
              <h6>Breeds</h6>
              <MultipleSelect
                options={dogBreedOptions ?? []}
                value={selectedDogBreeds}
                onChange={(selected: Option[]) => handleDogBreedChange(selected, 'breed')}
                labelledBy="Dog Breeds"
              />
            </div>

            <div className="mb-3">
              <h6>Zip Codes</h6>
              <MultipleSelect
                options={zipCodes}
                value={selectedZipCodes ?? []}
                onChange={(selected: Option[]) => handleZipCodeChange(selected, 'zipCode')}
                labelledBy="Zip Codes"
                isCreatable={true}
              />
            </div>
          </div>
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
