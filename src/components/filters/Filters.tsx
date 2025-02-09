import MultipleSelect, { Option } from '../multiSelect/MultiSelect'
import React, { useState } from 'react'
import { useDogBreeds } from '../../hooks/useDogs'
import ReactSlider from 'react-slider'
import './Filters.css'
import Dropdown from '../Dropdown/Dropdown'

interface FiltersProps {
  handleFilterChange: (selected: Option[], paramKey: string) => void
}

const Filters = ({ handleFilterChange }: FiltersProps) => {
  const dogBreeds = useDogBreeds()
  const dogBreedOptions: Option[] | undefined = dogBreeds?.data?.map((breed) => {
    return { label: breed, value: breed }
  })
  const [selectedDogBreeds, setSelectedDogBreeds] = useState<Option[]>([])

  const [zipCodes] = useState<Option[]>([])
  const [selectedZipCodes, setSelectedZipCodes] = useState<Option[]>()

  const [minAge, setMinAge] = useState(0)
  const [maxAge, setMaxAge] = useState(30)

  const [sort, setSort] = useState('breed')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleDogBreedChange = (selected: Option[]) => {
    handleFilterChange(selected, 'breed')
    setSelectedDogBreeds(selected)
  }

  const handleZipCodeChange = (selected: Option[]) => {
    handleFilterChange(selected, 'zipCode')
    setSelectedZipCodes(selected)
  }

  const handleSliderChange = (minMax: [min: number, max: number]) => {
    const minFilterOption = {
      label: 'ageMin',
      value: minMax[0].toString(),
    }
    const maxFilterOption = {
      label: 'ageMax',
      value: minMax[1].toString(),
    }
    handleFilterChange([minFilterOption], 'ageMin')
    handleFilterChange([maxFilterOption], 'ageMax')
    setMinAge(minMax[0])
    setMaxAge(minMax[1])
  }

  const handleSortOrDirectionOptionSelected = (option: string, sortOrDirection: 'sort' | 'direction') => {
    const value =
      sortOrDirection === 'sort'
        ? `${option.toLowerCase()}:${sortDirection.toLowerCase()}`
        : `${sort.toLowerCase()}:${option.toLowerCase()}`
    const sortDirectionFilterOption: Option = {
      label: 'sort',
      value,
    }

    sortOrDirection === 'sort' ? setSort(option) : setSortDirection(option)
    handleFilterChange([sortDirectionFilterOption], 'sort')
  }

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex flex-column text-center">
          <span>Sorted By</span>
          <Dropdown
            handleOnOptionSelected={(option) => handleSortOrDirectionOptionSelected(option, 'sort')}
            options={['Breed', 'Age', 'Name']}
          />
        </div>
        <div className="d-flex flex-column text-center">
          <span>Sort Order</span>
          <Dropdown
            handleOnOptionSelected={(option) => handleSortOrDirectionOptionSelected(option, 'direction')}
            options={['asc', 'desc']}
          />
        </div>
      </div>

      {/* Breed Filter */}
      <div className="mb-3">
        <h6>Breeds</h6>
        <MultipleSelect
          options={dogBreedOptions ?? []}
          value={selectedDogBreeds}
          onChange={(selected: Option[]) => handleDogBreedChange(selected)}
          labelledBy="Dog Breeds"
        />
      </div>

      <div className="mb-3">
        <h6>Zip Codes</h6>
        <MultipleSelect
          className=""
          options={zipCodes}
          value={selectedZipCodes ?? []}
          onChange={(selected: Option[]) => handleZipCodeChange(selected)}
          labelledBy="Zip Codes"
          isCreatable={true}
        />
      </div>

      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex flex-column text-center">
          <span>Minimum Age</span>
          <span>{minAge}</span>
        </div>
        <div className="d-flex flex-column text-center">
          <span>Maximum Age</span>
          <span>{maxAge}</span>
        </div>
      </div>

      <div className="position-relative" style={{ height: '50px' }}>
        <ReactSlider
          className=" bg-primary rounded-2 h-25 "
          thumbClassName="rounded-4 border-4 bg-white border-dark thumbSlider"
          trackClassName="some"
          defaultValue={[0, 30]}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          pearling
          minDistance={1}
          max={30}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  )
}

export default Filters
