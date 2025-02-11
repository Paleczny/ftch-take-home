import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { noop } from 'swr/_internal'

interface FavoritesProps {
  favoriteIds: Set<string>
  toggleFavorite: (favoriteDogId: string) => void
}

const FavoritesContext = createContext<FavoritesProps>({
  favoriteIds: new Set('[]'),
  toggleFavorite: noop,
})

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('resolvedIncidents') || '[]')),
  )

  const toggleFavorite = (favoriteDogId: string) => {
    setFavoriteIds((prevIds) => {
      const newFavoriteIds = new Set(prevIds)
      if (newFavoriteIds.has(favoriteDogId)) {
        newFavoriteIds.delete(favoriteDogId)
      } else {
        newFavoriteIds.add(favoriteDogId)
      }
      return newFavoriteIds
    })
  }

  return <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => useContext(FavoritesContext)
