import DogCard from '../dogCard/DogCard'
import React from 'react'
import { Dog } from '../../types/Dog.types'

interface DogListProps {
  dogs: Dog[]
}

const DogList = ({ dogs }: DogListProps) => {
  return (
    <div className="row">
      {dogs?.length === 0 ? (
        <p className="text-muted">No results found. Try adjusting filters.</p>
      ) : (
        dogs?.map((result, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <DogCard dog={result} />
          </div>
        ))
      )}
    </div>
  )
}

export default DogList
