import { useDogIds, useDogs } from '../hooks/useDogs'

const Dogs = () => {
  const dogIds = useDogIds()
  const dogs = useDogs(dogIds?.data?.resultIds ?? [])

  return (
    <>
      {' '}
      {dogs?.data?.map((dog) => {
        return (
          <div key={dog.id}>
            <img src={dog.img} alt={''}></img>
          </div>
        )
      })}
    </>
  )
}
export default Dogs
