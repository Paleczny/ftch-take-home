import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

interface PaginationProps {
  totalNumberOfResults?: number
  prevURL?: string | null
  nextURL?: string | null
  handlePaginationClick: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function Pagination({
  totalNumberOfResults = 0,
  prevURL,
  nextURL,
  handlePaginationClick,
}: PaginationProps) {
  const BASE_URL = 'https://frontend-take-home-service.fetch.com'
  const pageSize = getPageSize(prevURL, nextURL)
  const currentPage = getCurrentPage(prevURL, nextURL, pageSize)
  const totalPages = pageSize ? Math.ceil(totalNumberOfResults / pageSize) : 1
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  useEffect(() => {
    updateVisiblePages(currentPage, totalPages)
  }, [currentPage, totalPages])

  function updateVisiblePages(page: number, total: number) {
    let startPage = Math.max(1, page - 2)
    const endPage = Math.min(total, startPage + 4)

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i))
  }

  function getPageSize(prev: string | null | undefined, next: string | null | undefined): number {
    const url = prev || next
    return url ? parseInt(new URLSearchParams(url.split('?')[1]).get('size') || '25', 10) : 25
  }

  function getCurrentPage(prev: string | null | undefined, next: string | null | undefined, size: number): number {
    if (prev) {
      return Math.floor(parseInt(new URLSearchParams(prev.split('?')[1]).get('from') || '0', 10) / size) + 2
    }
    if (next) {
      return Math.floor(parseInt(new URLSearchParams(next.split('?')[1]).get('from') || '0', 10) / size)
    }
    return 1
  }

  function handlePageClick(page: number) {
    const from = (page - 1) * pageSize
    const pathName = prevURL ?? nextURL
    const providedURL = new URL(`${BASE_URL}${pathName}`)

    providedURL.searchParams.set('size', `${pageSize}`)
    providedURL.searchParams.set('from', `${from}`)
    handlePaginationClick(providedURL.toString())
    updateVisiblePages(page, totalPages)
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${prevURL ? '' : 'disabled'}`}>
          <button
            className="page-link"
            onClick={() => handlePaginationClick(`${BASE_URL}${prevURL}`)}
            disabled={!prevURL}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${nextURL ? '' : 'disabled'}`}>
          <button
            className={`page-link ${!nextURL || currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePaginationClick(`${BASE_URL}${nextURL}`)}
            disabled={!nextURL || currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
