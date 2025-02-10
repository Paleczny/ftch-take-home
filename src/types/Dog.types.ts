export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface DogId {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

export interface DogMatch {
  match: string
}
