import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NotFound } from '../NotFound'

describe('NotFound Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(
      screen.getByText('Oops! The page you are looking for does not exist. It might have been moved or deleted.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Go Back to Home')).toBeInTheDocument()
  })
})
