import { ChangeEvent } from 'react'

export interface UseFormReturnProps<T> {
  values: T
  handleFormChanges: (e: ChangeEvent<any>) => void
  clearForm: () => void
}

export interface UseFormProps<T> {
  initialFormValues: T
}
