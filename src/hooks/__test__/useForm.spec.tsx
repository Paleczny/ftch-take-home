import React, { act } from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useForm } from '../useForm'
import { UseFormProps, UseFormReturnProps } from '../../types/UseForm.types'

const user = userEvent.setup()

interface FormValues {
  name: string
  email: string
}

const TestComponent = ({ initialFormValues }: UseFormProps<any>) => {
  const { values, handleFormChanges, clearForm }: UseFormReturnProps<FormValues> = useForm({
    initialFormValues: initialFormValues,
  })

  return (
    <div>
      <input type="text" name="name" value={values.name} onChange={handleFormChanges} data-testid="name-input" />
      <input type="email" name="email" value={values.email} onChange={handleFormChanges} data-testid="email-input" />
      <button onClick={clearForm} data-testid="clear-button">
        Clear
      </button>
    </div>
  )
}

describe('useForm Hook', () => {
  const initialFormValues: FormValues = {
    name: '',
    email: '',
  }

  it('should initialize form with initial values', () => {
    render(<TestComponent initialFormValues={initialFormValues} />)
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement

    expect(nameInput.value).toBe(initialFormValues.name)
    expect(emailInput.value).toBe(initialFormValues.email)
  })

  it('should update form values on handleFormChanges', async () => {
    render(<TestComponent initialFormValues={initialFormValues} />)
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement

    await act(async () => {
      await user.type(nameInput, 'Bilbo Baggins')
    })

    expect(nameInput.value).toBe('Bilbo Baggins')
  })

  it('should reset form values on clearForm', async () => {
    render(<TestComponent initialFormValues={initialFormValues} />)
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const clearButton = screen.getByTestId('clear-button')

    await act(async () => {
      await user.type(nameInput, 'Frodo Baggins')
    })

    expect(nameInput.value).toBe('Frodo Baggins')

    await act(async () => {
      clearButton.click()
    })

    await waitFor(() => {
      expect(nameInput.value).toBe(initialFormValues.name)
    })
  })
})
