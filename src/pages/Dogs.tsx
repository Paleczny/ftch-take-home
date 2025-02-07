import { useDogBreeds, useDogIds, useDogs } from '../hooks/useDogs'
import React, { useState } from 'react'
import MultipleSelect, { Option } from '../components/multiSelect/MultiSelect'

export const Dogs = () => {
  const dogIds = useDogIds()
  const dogs = useDogs(dogIds?.data?.resultIds ?? [])
  const dogBreeds = useDogBreeds()

  const [selectedDogBreeds, setSelectedDogBreeds] = useState<Option[]>([])

  const dogBreedOptions: Option[] | undefined = dogBreeds?.data?.map((breed) => {
    return { label: breed, value: breed }
  })

  return (
    <>
      <MultipleSelect
        options={dogBreedOptions ?? []}
        selected={selectedDogBreeds}
        onChange={setSelectedDogBreeds}
        labelledBy="Select"
      />
    </>
  )
}
