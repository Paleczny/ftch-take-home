import React from 'react'
import { Dog } from '../../types/Dog.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useFavorites } from '../../contexts/FavoritesContext'

interface DogCardProps {
  dog: Dog
}
const DogCard = ({ dog }: DogCardProps) => {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const isFavorite = favoriteIds.has(dog.id)
  return (
    <div className="card p-1 shadow-sm">
      <FontAwesomeIcon
        onClick={() => toggleFavorite(dog.id)}
        className=" btn p-0 text-danger me-2"
        style={{ position: 'absolute', height: '25px' }}
        icon={isFavorite ? faHeart : emptyHeart}
      />
      <img className="card-img-top" src={dog.img} alt={''} />
      <span className="card-header text-center d-inline-flex justify-content-between m-0">
        <h5>{dog.name}</h5>
        <p className="p-2 badge rounded-pill bg-primary m-0">{dog.breed}</p>
      </span>
      <div className="card-body d-inline-flex justify-content-around">
        <p className=" mx-1 my-0">{dog.age} Years old</p>
        <p className={'my-0'}> {dog.zip_code}</p>
      </div>
    </div>
  )
}

export default DogCard
