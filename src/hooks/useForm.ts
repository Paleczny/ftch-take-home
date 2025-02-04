import { ChangeEvent, useState } from 'react'
import { UseFormProps, UseFormReturnProps } from '../types/UseForm.types'

/**
 * Custom hook to manage form state.
 *
 * @template T - The type of the form values object.
 * @param {UseFormProps<T>} props - The initial form values.
 * @param {T} props.initialFormValues - The initial state for the form values.
 * @returns {UseFormReturnProps<T>} - Returns an object containing the current form values, a function to handle changes, and a function to reset the form.
 *
 * @example
 * const initialValues = { name: '', email: '' };
 * const { values, handleFormChanges, clearForm } = useForm({ initialFormValues: initialValues });
 *
 * <form>
 *   <input name="name" value={values.name} onChange={handleFormChanges} />
 *   <input name="email" value={values.email} onChange={handleFormChanges} />
 *   <button type="button" onClick={clearForm}>Clear Form</button>
 * </form>
 */
export const useForm = <T>({ initialFormValues }: UseFormProps<T>): UseFormReturnProps<T> => {
  const [values, setValues] = useState<T>(initialFormValues)

  const handleFormChanges = (e: ChangeEvent<any>) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      }
    })
  }

  const clearForm = () => {
    setValues(initialFormValues)
  }

  return { values, handleFormChanges, clearForm }
}
